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
  Typography,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const TABLE_HEAD = [
  "Tên",
  "Số nhà",
  "Quan hệ với chủ hộ",
  "Ngày đăng ký",
  "Ngày chuyển đi",
  "",
];
const membersPerPage = 5;

export default function TableWithStripedRows() {
  const [disabled, setDisabled] = React.useState(true);
  const [active, setActive] = React.useState(1);
  const [open, setOpen] = React.useState(0);
  const [members, setMembers] = React.useState([]);
  const [name, setName] = React.useState("");
  const [relationship, setRelationship] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [error, setError] = React.useState("");
  const filteredMembers =
    search.length > 0
      ? members.filter(
          (member) =>
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.relationship.toLowerCase().includes(search.toLowerCase()) ||
            member.home.houseNumber === parseInt(search, 10)
        )
      : members;
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (active - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);
  function findDuplicates(arr) {
    const elementCount = {};
    const duplicates = [];

    // Đếm số lần xuất hiện của từng phần tử
    for (let item of arr) {
      if (item.relationship === "Chủ hộ")
        elementCount[item.home.houseNumber] =
          (elementCount[item.home.houseNumber] || 0) + 1;
    }

    // Lọc ra các phần tử có số lần xuất hiện > 1
    for (let key in elementCount) {
      if (elementCount[key] > 1) {
        duplicates.push(key);
      }
    }

    return duplicates;
  }
  const owners = findDuplicates(members);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const relationship = e.target[1].value;
    const houseNumber = e.target[2].value;
    if (!name || !relationship || !houseNumber) {
      setError("Hãy hoàn thành hết chỗ trống");
      return;
    }
    const response = await fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, relationship, houseNumber }),
    });
    const data = await response.json();
    // console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      toast.success("Đẫ thêm thành viên thành công");
      setOpen(0);
      setError("");
    }
  };

  const handleEditMember = (id) => {
    const index = members.findIndex((member) => member.id === id);
    handleOpen(2);
    setName(members[index].name);
    setRelationship(members[index].relationship);
    if (members[index].relationship === "Chủ hộ") {
      if (owners.includes(String(members[index].home.houseNumber))) {
        setDisabled(false);
        console.log(1);
      } else setDisabled(true);
    } else setDisabled(false);
    setHouseNumber(members[index].home.houseNumber);
    setIndex(index);
  };

  const updateMember = async (e) => {
    e.preventDefault();
    if (!name || !relationship || !houseNumber) {
      setError("Hãy hoàn thành tất cả các phần");
    }
    const response = await fetch(`/api/members/${members[index].id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, relationship, houseNumber }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      toast.success("Cập nhật thông tin thành công");
      handleOpen(0);
      setError("");
    }
  };

  const handleLeaveMember = async () => {
    if (!name || !relationship || !houseNumber) {
      setError("Hãy hoàn thành tất cả các phần");
    }
    const newDate=new Date().toISOString()
    const response = await fetch(`/api/members/${members[index].id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, relationship, houseNumber, leaveDate:newDate }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      toast.success("Cập nhật thông tin thành công");
      handleOpen(0);
      setError("");
    }
  };

  const handleDeleteMember = async () => {
    const response = await fetch(`/api/members/${members[index].id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Đã xóa thành công");
    }
    handleOpen(0);
  };

  React.useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch("/api/members");
      const data = await response.json();
      console.log(data);
      setMembers(data);
    };
    fetchMembers();
  }, [open]);

  return (
    <>
      <Card className="mt-4 w-full overflow-scroll">
        <section className="container mx-auto py-16 px-8">
          <div className="flex justify-between md:items-center gap-y-4 flex-col md:flex-row">
            <div>
              <Typography className="font-bold">
                Danh sách thành viên
              </Typography>
              <Typography variant="small" className="font-normal text-gray-600">
                Xem toàn bộ thông tin thành viên
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
              <Button onClick={() => handleOpen(1)}>Thêm thành viên</Button>
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
            {currentMembers.map(
              (
                {
                  id,
                  name,
                  registerDate,
                  leaveDate,
                  relationship,
                  home: { houseNumber },
                },
                index
              ) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
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
                      {relationship}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(registerDate).toLocaleString()}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {leaveDate
                        ? new Date(leaveDate).toLocaleString()
                        : "Đang sinh sống"}
                    </Typography>
                  </td>

                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-medium cursor-pointer"
                      onClick={() => handleEditMember(id)}
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
        <DialogHeader>Thêm 1 thành viên</DialogHeader>
        <form onSubmit={handleAddMember}>
          <DialogBody className="flex flex-col gap-4">
            <Input type="text" label="Tên" />
            <Input type="text" label="Quan hệ với chủ hộ" />
            <Input type="number" label="Số nhà" />
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
              <span>Xác nhân</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      <Dialog open={open === 2} handler={handleOpen}>
        <DialogHeader>Thông tin thành viên</DialogHeader>
        <form onSubmit={updateMember}>
          <DialogBody className="flex flex-col gap-4">
            <Input
              type="text"
              label="Tên"
              value={name}
              disabled={disabled}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              label="Quan hệ với chủ hộ"
              value={relationship}
              disabled={disabled}
              onChange={(e) => setRelationship(e.target.value)}
            />
            <Input
              type="number"
              label="Số nhà"
              disabled={disabled}
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
            <Typography variant="small" color="red" className="font-semibold">
              {error}
            </Typography>
            <Button
              variant="outlined"
              color="red"
              disabled={disabled}
              onClick={() => handleLeaveMember()}
              className="mr-1"
            >
              <span>Đã chuyển đi</span>
            </Button>
            <Button
              variant="gradient"
              color="red"
              disabled={disabled}
              onClick={() => handleDeleteMember()}
              className="mr-1"
            >
              <span>Xóa thành viên này</span>
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
