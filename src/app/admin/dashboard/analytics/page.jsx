"use client";
import React from "react";
import dynamic from "next/dynamic";

// @material-tailwind/react
import {
  Card,
  CardBody,
  Typography,
  Button,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  DialogFooter,
} from "@material-tailwind/react";

// charts import
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// deepmerge
import merge from "deepmerge";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

function AreaChart({ height = 350, series, colors, options }) {
  const chartOptions = React.useMemo(
    () => ({
      colors,
      ...merge(
        {
          chart: {
            height: height,
            type: "area",
            zoom: {
              enabled: true,
            },
            toolbar: {
              show: true,
            },
          },
          title: {
            show: "",
          },
          dataLabels: {
            enabled: true,
          },
          legend: {
            show: true,
          },
          markers: {
            size: 0,
            strokeWidth: 0,
            strokeColors: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          grid: {
            show: true,
            borderColor: "#EEEEEE",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          tooltip: {
            theme: "light",
          },
          yaxis: {
            labels: {
              style: {
                colors: "#757575",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#757575",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0,
              opacityTo: 0,
              stops: [0, 100],
            },
          },
        },
        options ? options : {}
      ),
    }),
    [height, colors, options]
  );

  return (
    <Chart type="area" height={height} series={series} options={chartOptions} />
  );
}
const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const countAnnual = (payments) => {
  const data = months.map((month) => {
    let count = 0;
    payments.forEach((payment) => {
      const date = new Date(payment.createdAt);
      if (date.getMonth() === months.indexOf(month)) {
        count += payment.bill.money;
      }
    });
    return count;
  });
  return data;
};
export function ChartsExample5() {
  const [payments, setPayments] = React.useState([]);
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const water = payments.filter((payment) => payment.bill.type === "Tiền nước");
  const electricity = payments.filter(
    (payment) => payment.bill.type === "Tiền điện"
  );
  const network = payments.filter(
    (payment) => payment.bill.type === "Tiền mạng"
  );
  const volunteer = payments.filter(
    (payment) => payment.bill.type === "Tiền từ thiện"
  );
  const services = payments.filter(
    (payment) => payment.bill.type === "Dịch vụ chung cư"
  );
  const management = payments.filter(
    (payment) => payment.bill.type === "Quản lý chung cư"
  );
  const parking = payments.filter((payment) => payment.bill.type === "Gửi xe");

  const waterPayment = countAnnual(water);
  const electricityPayment = countAnnual(electricity);
  const networkPayment = countAnnual(network);
  const volunteerPayment = countAnnual(volunteer);
  const servicesPayment = countAnnual(services);
  const managementPayment = countAnnual(management);
  const parkingPayment = countAnnual(parking);

  const createReport = (payments, bills) => {
    // const workbook = XLSX.utils.book_new();
    // for (let i = 0; i < payments.length; i++) {
    //   let sheet = {};
    //     for (let j = 0; j < payments[i].length; j++) {
    //       sheet[`${bills[i]} tháng ${j + 1}`] = payments[i][j];
    //     }
    //   console.log(sheet);
    //   const worksheet = XLSX.utils.json_to_sheet([sheet]);
    //   XLSX.utils.book_append_sheet(workbook, worksheet, `${bills[i]}`);
    // }
    // return workbook;
    const workbook = XLSX.utils.book_new();
    let allRows = [],
      allSum = 0;
    for (let i = 0; i < payments.length; i++) {
      let bill = {},
        sum = 0;
      bill[""] = bills[i];
      for (let j = 0; j < payments[i].length; j++) {
        bill[`Tháng ${j + 1}`] = payments[i][j];
        sum += payments[i][j];
      }
      bill["Tổng"] = sum;
      allSum += sum;
      allRows = [...allRows, bill];
    }

    let monthSum = {};
    monthSum[""] = "Tổng";
    for (let j = 0; j < 12; j++) {
      let sum = 0;
      for (let i = 0; i < payments.length; i++) {
        sum += payments[i][j];
      }
      monthSum[`Tháng ${j + 1}`] = sum;
    }
    monthSum["Tổng"] = allSum;
    allRows = [...allRows, monthSum];

    const worksheet = XLSX.utils.json_to_sheet(allRows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    return workbook;
  };

  const downloadReport = async () => {
    try {
      const workbook = createReport(
        [
          waterPayment,
          electricityPayment,
          networkPayment,
          volunteerPayment,
          servicesPayment,
          managementPayment,
          parkingPayment,
        ],
        [
          "Tiền nước",
          "Tiền điện",
          "Tiền mạng",
          "Tiền từ thiện",
          "Dịch vụ chung cư",
          "Quản lý chung cư",
          "Gửi xe",
        ]
      );
      const excelBlob = new Blob(
        [XLSX.write(workbook, { bookType: "xlsx", type: "array" })],
        {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      );

      // Yêu cầu người dùng chọn nơi lưu file
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "ExportedData.xlsx",
        types: [
          {
            description: "Excel Files",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
            },
          },
        ],
      });

      // Ghi file vào đường dẫn được chọn
      const writableStream = await fileHandle.createWritable();
      await writableStream.write(excelBlob);
      await writableStream.close();

      toast.success("Tải xuống file thành công");
    } catch (error) {
      console.log(error.message);
      toast.error("Tải xuống file thất bại");
    }
  };

  React.useEffect(() => {
    const fetchPayments = async () => {
      const response = await fetch("/api/payments");
      const data = await response.json();
      setPayments(data);
    };
    fetchPayments();
  }, []);
  const chartOptions = React.useMemo(() => {
    return (
      {
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      },
      [months]
    );
  });
  const currentSeries = React.useMemo(() => {
    return [
      {
        name: "Tiền nước",
        data: waterPayment,
      },
      {
        name: "Tiền điện",
        data: electricityPayment,
      },
      {
        name: "Tiền mạng",
        data: networkPayment,
      },
      {
        name: "Tiền từ thiện",
        data: volunteerPayment,
      },
      {
        name: "Dịch vụ chung cư",
        data: servicesPayment,
      },
      {
        name: "Quản lý chung cư",
        data: managementPayment,
      },
      {
        name: "Gửi xe",
        data: parkingPayment,
      },
    ];
  }, [
    waterPayment,
    electricityPayment,
    networkPayment,
    volunteerPayment,
    servicesPayment,
    managementPayment,
    parkingPayment,
  ]);
  return (
    <section className="m-[5rem] w-full">
      <Card className="mt-2">
        <CardBody className="!p-2">
          <div className="flex gap-2 flex-wrap justify-between px-4 !mt-4 ">
            <Typography variant="h3" color="blue-gray">
              {new Intl.NumberFormat("vi-VN").format(
                payments.reduce(
                  (total, payment) => total + payment.bill.money,
                  0
                )
              )}{" "}
              VND
            </Typography>
          </div>
          <AreaChart
            colors={[
              "#4CAF50",
              "#2196F3",
              "#FF9800",
              "#FFC107",
              "#FF5722",
              "#FFEB3B",
              "#8BC34A",
            ]}
            options={chartOptions}
            series={currentSeries}
          />
        </CardBody>
        <CardFooter className="flex gap-6 flex-wrap items-center justify-between">
          <div>
            <Typography variant="h6" color="blue-gray">
              Thống kê các khoản thu mỗi tháng
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-gray-600 mt-1"
            >
              So sánh giữa các loại khoản thu
            </Typography>
          </div>
          <Button variant="outlined" onClick={() => downloadReport()}>
            Báo cáo chi tiết
          </Button>
        </CardFooter>
      </Card>
      <Dialog open={open === 1} handler={handleOpen}>
        <DialogHeader>Tổng số tiền hàng tháng</DialogHeader>
        <DialogBody className="flex flex-col gap-4">Dâng phát triển</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Hủy</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Xác nhận</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}

export default ChartsExample5;
