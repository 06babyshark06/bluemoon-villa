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
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  BriefcaseIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { FaHandHoldingWater } from "react-icons/fa";
import {
  FcAssistant,
  FcDonate,
  FcElectricity,
  FcGlobe,
  FcOrganization,
} from "react-icons/fc";
import { TbParkingCircleFilled } from "react-icons/tb";
import { HiCheck } from "react-icons/hi";
import { PlusIcon } from "@heroicons/react/24/outline";
import { services } from "@/app/utils/services";
import { toast } from "react-toastify";
import { da } from "date-fns/locale";
import { type } from "@/app/utils/type";

function BillingCard({
  id,
  bill: { billName, type, money, consumption },
  home: { houseNumber, members },
  createdAt,
  edit,
  open,
  setId,
  approved,
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
          <Button
            size="sm"
            variant="text"
            color="green"
            className="flex items-center gap-2"
            onClick={() => approved(id)}
          >
            <HiCheck className="h-4 w-4 text-green-600" />
            <Typography className="!font-semibold text-xs text-green-600 md:block hidden">
              Xác nhận đóng tiền
            </Typography>
          </Button>
          <Button size="sm" variant="text" className="flex items-center gap-2">
            <PencilIcon className="h-4 w-4 text-gray-600" />
            <Typography
              className="!font-semibold text-xs text-gray-600 md:block hidden"
              onClick={() => edit(id)}
            >
              Thay đổi
            </Typography>
          </Button>
          <Button
            size="sm"
            variant="text"
            color="red"
            className="flex items-center gap-2"
            onClick={() => {
              open(4);
              setId(id);
            }}
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
  const [checkedService, setCheckedService] = React.useState(false);
  const [checkedManage, setCheckedManage] = React.useState(false);
  const [checkedParking, setCheckedParking] = React.useState(false);
  const [typeFilter, setTypeFilter] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [specificPayment, setSpecificPayment] = React.useState({});
  const [billName, setBillName] = React.useState("");
  const [money, setMoney] = React.useState("");
  const [id, setId] = React.useState(null);
  const filteredPayments = payments.filter(({ bill: { type } }) =>
    typeFilter ? type === typeFilter : true
  );
  const searchedPayments =
    search.length > 0
      ? filteredPayments.filter(
          ({ home, bill }) =>
            home.members
              .filter((member) => member.relationship === "Chủ hộ")[0]
              .name.toLowerCase()
              .includes(search.toLowerCase()) ||
            bill.billName.toLowerCase().includes(search.toLowerCase()) ||
            new Date(bill.createdAt)
              .toLocaleString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            home.houseNumber === parseInt(search, 10) ||
            bill.money.toString().includes(search)
        )
      : filteredPayments;

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
      setChosenService("");
      handleOpen(0);
    }
  };

  const handleAddMonthlyPayments = async (e) => {
    e.preventDefault();
    if (checkedService) {
      const type = "Dịch vụ chung cư";
      const billName = "Phí dịch vụ chung cư";
      const money = e.target[1].value;
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ billName, type, money }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        toast.success("Đã thêm khoản thu mới thành công");
        setError("");
        handleOpen(0);
      }
    }
    if (checkedManage) {
      const type = "Quản lý chung cư";
      const billName = "Phí quản lý chung cư";
      const money = e.target[3].value;
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ billName, type, money }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        toast.success("Đã thêm khoản thu mới thành công");
        setError("");
        handleOpen(0);
      }
    }
    if (checkedParking) {
      const type = "Gửi xe";
      const billName = "Phí gửi xe";
      const cars = e.target[5].value;
      const bikes = e.target[6].value;
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ billName, type, cars, bikes }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        toast.success("Đã thêm khoản thu mới thành công");
        setError("");
        handleOpen(0);
      }
    }
    handleOpen(0);
  };

  const handleEdit = async (id) => {
    handleOpen(3);
    const response = await fetch(`/api/payments/${id}`);
    const data = await response.json();
    setSpecificPayment(data);
    setId(data.id);
    setBillName(data.bill.billName);
    setMoney(data.bill.money);
    setConsumption(data.bill.consumption);
  };

  const handleApproved = async (id) => {
    handleOpen(5);
    const response = await fetch(`/api/payments/${id}`);
    const data = await response.json();
    setSpecificPayment(data);
    setId(data.id);
  };

  const editCurrentPayment = async (e) => {
    e.preventDefault();
    const billName = e.target[1].value;
    if (!billName || !money) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const response = await fetch(`/api/payments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ billName, money, consumption }),
    });
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else {
      toast.success("Đã cập nhật khoản thu");
      setConsumption("");
      setBillName("");
      setMoney("");
      setError("");
      handleOpen(0);
    }
  };

  const deletePayment = async () => {
    const response = await fetch(`/api/payments/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Đã xóa khoản thu");
      handleOpen(0);
    }
  };

  const approvePayment = async () => {
    if (!money) {
      setError("Hãy điền đầy đủ");
      return;
    }
    if (money != specificPayment.bill.money) {
      setError("Hãy nhập chính xác số tiền");
      return;
    } else {
      const response = await fetch(`/api/payments/${specificPayment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paid: true, payAt: new Date().toISOString() }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        toast.success("Đã hoàn thành khoản thu này");
        setError("");
        setMoney("");
        handleOpen(0);
      }
    }
    setError("");
  };
  React.useEffect(() => {
    const fetchPayments = async () => {
      const response = await fetch("/api/payments");
      const data = await response.json();
      console.log(data);
      setPayments(data.filter(payment=>!payment.paid));
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
        <CardBody>
          <Tabs value={typeFilter}>
            <TabsHeader className="items-center">
              {type.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  className="capitalize z-0"
                  onClick={() => {
                    setTypeFilter(value);
                  }}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            {/* <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody> */}
          </Tabs>
          <div className="lg:w-96 mt-4">
            <Input
              label="Tìm kiếm"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className=""
              value={search}
            />
          </div>
        </CardBody>
        <CardBody className="flex flex-col gap-4 !p-4">
          {searchedPayments.map((props, key) => (
            <BillingCard
              key={key}
              edit={handleEdit}
              open={handleOpen}
              {...props}
              setId={setId}
              approved={handleApproved}
            />
          ))}
        </CardBody>
      </Card>
      <Dialog open={open === 1} handler={handleOpen}>
        <DialogHeader>Thêm khoản thu mới</DialogHeader>
        <form onSubmit={addNewPayment}>
          <DialogBody className="flex flex-col gap-4">
            <Input type="number" label="Số nhà" />
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
        <form onSubmit={handleAddMonthlyPayments}>
          <DialogBody className="flex flex-col gap-4">
            <Switch
              label="Phí dịch vụ chung cư"
              ripple={true}
              checked={checkedService}
              onChange={(e) => setCheckedService(!checkedService)}
            />
            <Input
              type="number"
              label="Giá tiền dịch vụ chung cư 1 tháng"
              disabled={!checkedService}
            />
            <Switch
              label="Phí quản lý chung cư"
              ripple={true}
              checked={checkedManage}
              onChange={(e) => setCheckedManage(!checkedManage)}
            />
            <Input
              type="number"
              label="Giá tiền quản lý chung cư 1 tháng"
              disabled={!checkedManage}
            />
            <Switch
              label="Phí gửi xe"
              ripple={true}
              checked={checkedParking}
              onChange={(e) => setCheckedParking(!checkedParking)}
            />
            <Input
              type="number"
              label="Giá tiền gửi ô tô 1 tháng"
              disabled={!checkedParking}
            />
            <Input
              type="number"
              label="Giá tiền gửi xe máy 1 tháng"
              disabled={!checkedParking}
            />
            <Typography variant="small" color="red" className="!font-normal">
              Chức năng này sẽ áp dụng cho tất cả các hộ
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
      <Dialog open={open === 3} handler={handleOpen}>
        <DialogHeader>Thông tin khoản thu</DialogHeader>
        <form onSubmit={editCurrentPayment}>
          <DialogBody className="flex flex-col gap-4">
            <Input
              type="text"
              label="Số nhà"
              value={specificPayment?.home?.houseNumber}
              onChange={() => {}}
              disabled={true}
            />
            <Input
              type="text"
              label="Tên khoản thu"
              value={billName}
              onChange={(e) => setBillName(e.target.value)}
            />
            <Input
              label="Chọn loại khoản thu"
              value={specificPayment?.bill?.type}
              onChange={() => {}}
              disabled={true}
            />
            <Input
              type="text"
              label="Số tiền"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            />
            {specificPayment?.bill?.type === "Tiền nước" && (
              <Input
                type="text"
                label="Số khối nước"
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
              />
            )}
            {specificPayment?.bill?.type === "Tiền điện" && (
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
      <Dialog open={open === 4} handler={handleOpen}>
        <DialogHeader>Xác nhận xóa</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          Không thể khôi phục khi xóa. Vẫn xóa?
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
          <Button
            variant="gradient"
            color="red"
            type="submit"
            onClick={() => deletePayment()}
          >
            <span>Xóa</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={open === 5} handler={handleOpen}>
        <DialogHeader>Xác nhận đóng tiền</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input
            type="number"
            label="Nhập lại số tiền đã đóng"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
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
          <Button
            variant="gradient"
            color="green"
            type="submit"
            onClick={() => approvePayment()}
          >
            <span>Xác nhận</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}

export default Billing3;
