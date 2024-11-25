"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  DialogFooter,
  Input,
  DialogBody,
  DialogHeader,
  Dialog,
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";
import {
  BriefcaseIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { FaHandHoldingWater } from "react-icons/fa";
import { FcDonate, FcElectricity, FcGlobe } from "react-icons/fc";
import { HiCheck } from "react-icons/hi";
import { PlusIcon } from "@heroicons/react/24/outline";
import { services } from "@/app/utils/services";
import { toast } from "react-toastify";
import { da } from "date-fns/locale";

function BillingCard({
  bill: { billName, type, money, consumption },
  home: { houseNumber, members },
  createdAt,
}) {
  return (
    <Card shadow={false} className="rounded-lg border border-gray-300 p-4">
      <div className="mb-4 flex items-start justify-between">
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
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 font-bold"
            >
              {billName}
            </Typography>
            <Typography className="!text-gray-600 text-xs font-normal">
              {`Nhà số ${houseNumber}`}
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button size="sm" variant="text" className="flex items-center gap-2">
            <HiCheck className="h-4 w-4 text-green-600" />
            <Typography className="!font-semibold text-xs text-green-600 md:block hidden">
              Xác nhận đóng tiền
            </Typography>
          </Button>
          <Button size="sm" variant="text" className="flex items-center gap-2">
            <PencilIcon className="h-4 w-4 text-gray-600" />
            <Typography className="!font-semibold text-xs text-gray-600 md:block hidden">
              Thay đổi
            </Typography>
          </Button>
          <Button
            size="sm"
            variant="text"
            color="red"
            className="flex items-center gap-2"
          >
            <TrashIcon className="h-4 w-4 text-red-500" />
            <Typography className="!font-semibold text-xs text-red-500 md:block hidden">
              Xóa
            </Typography>
          </Button>
        </div>
      </div>
      <div>
        <div>
          <div className="flex gap-1">
            <Typography className="mb-1 text-xs !font-medium !text-gray-600">
              Liên hệ:
            </Typography>
            <Typography className="text-xs !font-bold" color="blue-gray">
              {members[0].name}
            </Typography>
          </div>
          {type == "Tiền nước" && (
            <div className="flex gap-1">
              <Typography className="mb-1 text-xs !font-medium !text-gray-600">
                Số khối nước:
              </Typography>
              <Typography className="text-xs !font-bold" color="blue-gray">
                {consumption}
              </Typography>
            </div>
          )}
          {type == "Tiền điện" && (
            <div className="flex gap-1">
              <Typography className="mb-1 text-xs !font-medium !text-gray-600">
                Số kwh tiêu thụ:
              </Typography>
              <Typography className="text-xs !font-bold" color="blue-gray">
                {consumption}
              </Typography>
            </div>
          )}
          <div className="flex gap-1">
            <Typography className="mb-1 text-xs !font-medium !text-gray-600">
              Số tiền:
            </Typography>
            <Typography className="text-xs !font-bold" color="blue-gray">
              {money}
            </Typography>
          </div>
          <div className="flex gap-1">
            <Typography className="mb-1 text-xs !font-medium !text-gray-600">
              Ngày khởi tạo:
            </Typography>
            <Typography className="text-xs !font-bold" color="blue-gray">
              {new Date(createdAt).toLocaleString()}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
}
function Billing3() {
  const [open, setOpen] = React.useState(0);
  const [chosenService, setChosenService] = React.useState("");
  const [consumption, setConsumption] = React.useState("");
  const [error, setError] = React.useState("");
  const [payments, setPayments] = React.useState([]);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const addNewPayment = async (e) => {
    e.preventDefault();
    console.log(e);
    const houseNumber = e.target[0].value;
    const billName = e.target[1].value;
    const type = chosenService;
    const money = e.target[3].value;
    if (!houseNumber || !billName || !type || !money) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const response = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ houseNumber, billName, type, money, consumption }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      toast.success("Đã thêm khoản thu mới thành công");
      setError("");
      setConsumption("");
      handleOpen(0);
    }
  };
  React.useEffect(() => {
    const fetchPayments = async () => {
      const response = await fetch("/api/payments");
      const data = await response.json();
      console.log(data);
      setPayments(data);
    };
    fetchPayments();
  }, [open]);
  return (
    <section className="max-w-4xl !mx-auto px-8 py-20 w-full">
      <Card shadow={false}>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex gap-2 flex-col md:flex-row items-start !justify-between"
        >
          <div className="w-full mb-2">
            <Typography className="!font-bold" color="blue-gray">
              Thông tin các khoản thu
            </Typography>
            <Typography
              className="mt-1 !font-normal !text-gray-600"
              variant="small"
            >
              Xem và cập nhật thống tin các khoản thu nhanh chóng.
            </Typography>
          </div>
          <div className="w-full flex">
            <Button
              size="sm"
              variant="outlined"
              color="gray"
              className="flex justify-center gap-3 md:max-w-fit w-full ml-auto"
              onClick={() => handleOpen(2)}
            >
              <PlusIcon strokeWidth={3} className="h-4 w-4" />
              Thêm khoản thu hàng tháng
            </Button>
            <Button
              size="sm"
              variant="outlined"
              color="gray"
              className="flex justify-center gap-3 md:max-w-fit w-full ml-auto"
              onClick={() => handleOpen(1)}
            >
              <PlusIcon strokeWidth={3} className="h-4 w-4" />
              Thêm mới
            </Button>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 !p-4">
          {payments.map((props, key) => (
            <BillingCard key={key} {...props} />
          ))}
        </CardBody>
      </Card>
      <Dialog open={open === 1} handler={handleOpen}>
        <DialogHeader>Thêm khoản thu mới</DialogHeader>
        <form onSubmit={addNewPayment}>
          <DialogBody className="flex flex-col gap-4">
            <Input type="text" label="Số nhà" />
            <Input type="text" label="Tên khoản thu" />
            <Select
              label="Chọn loại khoản thu"
              value={chosenService}
              onChange={(e) => setChosenService(e)}
            >
              {services.map((service) => (
                <Option key={service} value={service}>
                  {service}
                </Option>
              ))}
            </Select>
            <Input type="text" label="Số tiền" />
            {chosenService === "Tiền nước" && (
              <Input
                type="text"
                label="Số khối nước"
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
              />
            )}
            {chosenService === "Tiền điện" && (
              <Input
                type="text"
                label="Số kwh sử dụng"
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
              />
            )}
            <Typography variant="small" color="red" className="!font-normal">
              {error}
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Hủy</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Xác nhận</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      <Dialog open={open === 2} handler={handleOpen}>
        <DialogHeader>Thêm khoản thu hàng tháng</DialogHeader>
        <form onSubmit={() => handleOpen(0)}>
          <DialogBody className="flex flex-col gap-4">
            <Switch label="Quản lý" ripple={true} checked={true} />
            <Input type="text" label="Name" />
            <Input type="text" label="Relationship" />
            <Input type="number" label="House Number" />
            <Button
              variant="gradient"
              color="red"
              onClick={() => handleDeleteMember()}
              className="mr-1"
            >
              <span>Delete this member</span>
            </Button>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </section>
  );
}

export default Billing3;
