"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { FaHandHoldingWater } from "react-icons/fa";
import {
  FcAssistant,
  FcDonate,
  FcElectricity,
  FcGlobe,
  FcHome,
  FcInfo,
  FcOrganization,
} from "react-icons/fc";
import React from "react";
import { TbParkingCircleFilled } from "react-icons/tb";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const TABLE_HEAD = [
  "Tên khoản thu",
  "Số tiền",
  "Ngày thanh toán",
  "Trạng thái",
  "Hộ gia đình",
  "",
];
function cleanJSON(data) {
  const result = data.map((item) => {
    const cleanedItem = {};
    cleanedItem["Khoản thu"] = item.bill.billName;
    cleanedItem["Số tiền"] = item.bill.money;
    cleanedItem["Ngày thanh toán"]=new Date(item.payAt).toLocaleString();
    cleanedItem["Chủ hộ"] = item.home.members[0].name;
    cleanedItem["Số nhà"] = item.home.houseNumber;
    return cleanedItem;
  });
  return result;
}

export default function TransactionsTable() {
  const [active, setActive] = React.useState(1);
  const [open, setOpen] = React.useState(0);
  const [payments, setPayments] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [paymentsPerPage, setPaymentsPerPage] = React.useState(5);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const searchedPayments =
    search.length > 0
      ? payments.filter(
          ({ home, bill }, payAt) =>
            home.members
              .filter((member) => member.relationship === "Chủ hộ")[0]
              .name.toLowerCase()
              .includes(search.toLowerCase()) ||
            bill.billName.toLowerCase().includes(search.toLowerCase()) ||
            new Date(payAt)
              .toLocaleString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            home.houseNumber.toString().includes(search) ||
            bill.money.toString().includes(search)
        )
      : payments;
  const totalPages = Math.ceil(searchedPayments.length / paymentsPerPage);
  const startIndex = (active - 1) * paymentsPerPage;
  const endIndex = startIndex + paymentsPerPage;
  const currentPayments = searchedPayments.slice(startIndex, endIndex);
  const downloadPayments = async () => {
    const cleanedData = cleanJSON(searchedPayments);
    console.log(cleanedData);
    try {
      // Tạo workbook và worksheet
      const worksheet = XLSX.utils.json_to_sheet(cleanedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
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

      toast.success("Tải xuống file thanh cong");
    } catch (error) {
      toast.error("Tải xuống file that bai");
    }
  };

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };
  React.useEffect(() => {
    const fetchPayments = async () => {
      const response = await fetch("/api/payments");
      const data = await response.json();
      setPayments(data.filter((payment) => payment.paid));
    };
    fetchPayments();
  }, [open]);
  return (
    <Card className="mt-16 h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Thanh toán gần đây
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Đây là thông tin các thanh toán gần đây
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Tìm kiếm"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => downloadPayments()}
            >
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Tải
              xuống
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPayments.map(
              (
                {
                  id,
                  bill: { billName, type, money, consumption },
                  home: { houseNumber, members },
                  paid,
                  payAt,
                },
                index
              ) => {
                const isLast = index === payments.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="border border-gray-200 p-2.5 rounded-lg">
                          {type == "Tiền điện" && (
                            <FcElectricity className="h-6 w-6 text-gray-900" />
                          )}
                          {type == "Tiền nước" && (
                            <FaHandHoldingWater className="h-6 w-6 text-gray-900" />
                          )}
                          {type == "Tiền mạng" && (
                            <FcGlobe className="h-6 w-6 text-gray-900" />
                          )}
                          {type == "Tiền từ thiện" && (
                            <FcDonate className="h-6 w-6 text-gray-900" />
                          )}
                          {type == "Dịch vụ chung cư" && (
                            <FcAssistant className="h-6 w-6 text-gray-900" />
                          )}
                          {type == "Quản lý chung cư" && (
                            <FcOrganization className="h-6 w-6 text-gray-900" />
                          )}
                          {type == "Gửi xe" && (
                            <TbParkingCircleFilled className="h-6 w-6 text-gray-900" />
                          )}
                        </div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {billName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {`${money} VND`}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(payAt).toLocaleString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value="Đã đóng tiền"
                          color={
                            paid
                              ? "green"
                              : paid === "pending"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md border border-blue-gray-50 p-1">
                          <FcHome className="h-full w-full text-gray-900" />
                        </div>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {members[0].name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {`Nhà số: ${houseNumber}`}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    {/* <td className={classes}>
                      <Tooltip content="Thông tin chi tiết">
                        <IconButton variant="text">
                          <FcInfo className="h-6 w-6 text-gray-900" />
                        </IconButton>
                      </Tooltip>
                    </td> */}
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <section className="container mx-auto py-5 px-4">
          <div className="flex items-center gap-8 justify-between">
            <Typography variant="small" className="font-bold text-gray-600">
              Trang <strong className="text-gray-900">{active}</strong> trên{" "}
              <strong className="text-gray-900">{totalPages}</strong>
            </Typography>
            <Menu
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              <MenuHandler>
                <Button variant="outlined">{paymentsPerPage} hóa đơn</Button>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => setPaymentsPerPage(5)}>
                  5 hóa đơn
                </MenuItem>
                <MenuItem onClick={() => setPaymentsPerPage(10)}>
                  10 hóa đơn
                </MenuItem>
                <MenuItem onClick={() => setPaymentsPerPage(20)}>
                  20 hóa đơn
                </MenuItem>
              </MenuList>
            </Menu>
            <div className="flex gap-4 items-center">
              <Button
                size="sm"
                variant="outlined"
                onClick={prev}
                disabled={active === 1}
                className="flex gap-1 items-center border-gray-300"
              >
                <ChevronLeftIcon strokeWidth={3} className="h-3 w-3" />
                Trước
              </Button>
              <Button
                size="sm"
                variant="outlined"
                onClick={next}
                disabled={active === 10}
                className="flex gap-1 items-center border-gray-300"
              >
                Sau
                <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      </CardFooter>
    </Card>
  );
}
