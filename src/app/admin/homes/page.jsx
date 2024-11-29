"use client";
import React from "react";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const TABLE_HEAD = [
  "Số nhà",
  "Chủ hộ",
  "Diện tích",
  "Số lượng ô tô",
  "Số lượng xe máy",
  "Số lượng thành viên",
  "Trạng thái",
  "",
];
const membersPerPage = 5;
const statusLiving = "Đang sinh sống";
const statusMoved = "Đã chuyển đi";

export default function TableWithStripedRows() {
  const [active, setActive] = React.useState(1);
  const [open, setOpen] = React.useState(0);
  const [error, setError] = React.useState("");
  const [homesPerPage, setHomesPerPage] = React.useState(5);
  const [homes, setHomes] = React.useState([]);
  const [owner, setOwner] = React.useState("");
  const [size, setSize] = React.useState(0);
  const [houseNumber, setHouseNumber] = React.useState("");
  const [cars, setCars] = React.useState("");
  const [bikes, setBikes] = React.useState("");
  const [id, setId] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const filteredHomes =
    search.length > 0
      ? homes.filter(
          (home) =>
            home.members
              .filter((member) => member.relationship === "Chủ hộ")[0]
              ?.name.toLowerCase()
              .includes(search.toLowerCase()) ||
            statusLiving.toLowerCase().includes(search.toLowerCase()) ||
            statusMoved.toLowerCase().includes(search.toLowerCase()) ||
            home.houseNumber.toString().includes(search) ||
            home.size.toString().includes(search) ||
            home.cars.toString().includes(search) ||
            home.bikes.toString().includes(search)
        )
      : homes;
  const totalPages = Math.ceil(filteredHomes.length / homesPerPage);
  const startIndex = (active - 1) * homesPerPage;
  const endIndex = startIndex + homesPerPage;
  const currentHomes = filteredHomes.slice(startIndex, endIndex);

  const handleOpen = (value) => {
    setError("");
    setOpen(open === value ? 0 : value);
  };

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const handleAddHome = async (e) => {
    e.preventDefault();
    const owner = e.target[0].value;
    const size = e.target[1].value;
    const houseNumber = e.target[2].value;
    const cars = e.target[3].value;
    const bikes = e.target[4].value;
    if (!owner || !size || !houseNumber || !cars || !bikes) {
      setError("Hãy điền đủ tất cả thống tin");
      return;
    }
    const response = await fetch("/api/homes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ owner, size, houseNumber, cars, bikes }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      toast.success("Đã thêm hộ thành công");
      handleOpen(0);
    }
  };

  const handleEditHome = (id) => {
    const home = homes.find((home) => home.id === id);
    console.log(home);
    handleOpen(2);
    setOwner(
      home.members.find((member) => member.relationship === "Chủ hộ").name
    );
    setSize(home.size);
    setHouseNumber(home.houseNumber);
    setCars(home.cars);
    setBikes(home.bikes);
    setId(id);
    console.log(id);
  };

  const updateHome = async (e) => {
    e.preventDefault();
    if (!size || !cars || !bikes) {
      setError("Hãy điền đủ tất cả thống tin");
      return;
    }
    const response = await fetch(`/api/homes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ size, cars, bikes }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      toast.success("Đã cập nhật hộ thành công");
    }
    handleOpen(0);
  };

  const handleLeaveHome = async () => {
    const response = await fetch(`/api/homes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLiving: false }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      toast.success("Đã xác nhận chuyển đi thành công");
    }
    handleOpen(0);
  };
  const handleDeleteHome = async () => {
    console.log(id);
    const response = await fetch(`/api/homes/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Đã xóa hộ này");
      setOwner("");
      setSize(0);
      setHouseNumber(0);
      setCars(0);
      setBikes(0);
      setId(0);
    }
    handleOpen(0);
  };

  React.useEffect(() => {
    const fetchHomes = async () => {
      const response = await fetch("/api/homes");
      const data = await response.json();
      console.log(data);
      setHomes(data);
    };
    fetchHomes();
  }, [open]);

  return (
    <>
      <Card className="mt-4 w-full overflow-scroll">
        <section className="container mx-auto py-16 px-8">
          <div className="flex justify-between md:items-center gap-y-4 flex-col md:flex-row">
            <div>
              <Typography className="font-bold">
                Danh sách hộ gia đình
              </Typography>
              <Typography variant="small" className="font-normal text-gray-600">
                Xem thông tin của tất cả hộ gia đình
              </Typography>
            </div>
            <div className="flex gap-2">
              <div className="lg:w-96">
                <Input
                  label="Tìm kiếm"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setActive(1);
                  }}
                  value={search}
                />
              </div>
              <Button onClick={() => handleOpen(1)}>thêm hộ</Button>
            </div>
          </div>
        </section>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
            {currentHomes.map(
              (
                { id, houseNumber, size, cars, bikes, members, isLiving },
                index
              ) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {houseNumber}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {members.filter(
                        (member) => member.relationship === "Chủ hộ"
                      ).length > 0 &&
                        members.filter(
                          (member) => member.relationship === "Chủ hộ"
                        )[0].name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {size}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {cars}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {bikes}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {members.length}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {isLiving ? "Đang sinh sống" : "Đã chuyển đi"}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-medium cursor-pointer"
                      onClick={() => handleEditHome(id)}
                    >
                      Chỉnh sửa
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <section className="container mx-auto py-20 px-4">
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
                <Button variant="outlined">{homesPerPage} hộ</Button>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => setHomesPerPage(5)}>
                  5 hộ
                </MenuItem>
                <MenuItem onClick={() => setHomesPerPage(10)}>
                  10 hộ
                </MenuItem>
                <MenuItem onClick={() => setHomesPerPage(20)}>
                  20 hộ
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
      </Card>
      <Dialog open={open === 1} handler={handleOpen}>
        <DialogHeader>Thêm hộ gia đình</DialogHeader>
        <form onSubmit={handleAddHome}>
          <DialogBody className="flex flex-col gap-4">
            <Input type="text" label="Tên chủ hộ" />
            <Input type="number" label="Diện tích nhà" />
            <Input type="number" label="Số nhà" />
            <Input type="number" label="Số lượng ô tô" />
            <Input type="number" label="Số lượng xe máy" />
            <Typography variant="small" color="red" className="font-semibold">
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
        <DialogHeader>Thông tin hộ gia đình</DialogHeader>
        <form onSubmit={updateHome}>
          <DialogBody className="flex flex-col gap-4">
            <Input
              type="text"
              label="Tên chủ hộ"
              value={owner}
              disabled={true}
              onChange={(e) => setOwner(e.target.value)}
            />
            <Input
              type="number"
              label="Diện tích nhà"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <Input
              type="number"
              label="Số nhà"
              disabled={true}
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
            <Input
              type="number"
              label="Số lượng ô tô"
              value={cars}
              onChange={(e) => setCars(e.target.value)}
            />
            <Input
              type="number"
              label="Số lượng xe máy"
              value={bikes}
              onChange={(e) => setBikes(e.target.value)}
            />
            <Typography variant="small" color="red" className="font-semibold">
              {error}
            </Typography>
            <Button
              variant="outlined"
              color="red"
              onClick={() => handleLeaveHome()}
              className="mr-1"
            >
              <span>Xác nhận chuyển đi</span>
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => handleDeleteHome()}
              className="mr-1"
            >
              <span>Xóa hộ gia đình này</span>
            </Button>
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
    </>
  );
}
