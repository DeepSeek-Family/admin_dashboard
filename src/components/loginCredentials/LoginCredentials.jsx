import React, { useState, useEffect, useMemo } from "react";
import { Table, Button, Form, Input, Select, Spin } from "antd";
import Swal from "sweetalert2";
import UserModal from "./UserModal";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusAsAdminMutation,
} from "../../redux/apiSlices/userSlice";
import toast from "react-hot-toast";

const { Option } = Select;

const components = {
  header: {
    row: (props) => (
      <tr
        {...props}
        style={{
          backgroundColor: "#f0f5f9",
          height: "50px",
          color: "secondary",
          fontSize: "18px",
          textAlign: "center",
          padding: "12px",
        }}
      />
    ),
    cell: (props) => (
      <th
        {...props}
        style={{
          color: "secondary",
          fontWeight: "bold",
          fontSize: "18px",
          textAlign: "center",
          padding: "12px",
        }}
      />
    ),
  },
};

const LoginCredentials = () => {
  // ✅ Query hook theke refetch destructure kora hoise
  const { data: usersData, isLoading, refetch } = useGetAllUsersQuery();
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusAsAdminMutation();

  const [activeTab, setActiveTab] = useState("Employee");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [roles] = useState(["Admin", "User", "Client"]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalForm] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tableLoading, setTableLoading] = useState(false);

  // Memoized employee/client data
  const employeeData = useMemo(
    () => usersData?.data.filter((user) => user?.role === "EMPLOYEE") || [],
    [usersData]
  );
  const clientData = useMemo(
    () => usersData?.data.filter((user) => user?.role === "CLIENT") || [],
    [usersData]
  );

  // Update data when tab changes
  useEffect(() => {
    setTableLoading(true);
    const updateData = activeTab === "Employee" ? employeeData : clientData;
    setData(updateData);
    setFilteredData(updateData);
    setTimeout(() => setTableLoading(false), 200);
  }, [activeTab, employeeData, clientData]);

  // Filter by isActive status
  useEffect(() => {
    if (filterStatus === "All") setFilteredData(data);
    else
      setFilteredData(
        data.filter((item) =>
          filterStatus === "Active"
            ? item.isActive === true
            : item.isActive === false
        )
      );
  }, [data, filterStatus]);

  // Function to get location from lat/lon
  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data?.display_name || "Unknown Location";
    } catch (error) {
      console.error("Error fetching location:", error);
      return "Unknown Location";
    }
  };

  // Fetch locations for users
  useEffect(() => {
    if (!usersData) return;
    const updateData = activeTab === "Employee" ? employeeData : clientData;
    setTableLoading(true);

    const fetchLocations = async () => {
      const updatedData = await Promise.all(
        updateData.map(async (user) => {
          if (user.latitude && user.longitude) {
            const placeName = await getPlaceName(user.latitude, user.longitude);
            return { ...user, locationName: placeName };
          }
          return { ...user, locationName: "N/A" };
        })
      );
      setData(updatedData);
      setFilteredData(updatedData);
      setTableLoading(false);
    };

    fetchLocations();
  }, [usersData, activeTab]);

  // Save button action (modal)
  const handleSave = () => {
    toast.success("Changes saved successfully!");
  };

  // Tab toggle
  const toggleTab = (tab) => setActiveTab(tab);

  // Table columns
  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    { title: "User Name", dataIndex: "name", key: "name", align: "center" },
    { title: "Email", dataIndex: "email", key: "email", align: "center" },
    {
      title: "Location",
      dataIndex: "locationName",
      key: "location",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "joiningDate",
      align: "center",
      render: (value) => {
        if (!value) return "N/A";
        const date = new Date(value);
        return date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      },
    },
    ...(activeTab === "Employee"
      ? [
          {
            title: "Shift Completed",
            dataIndex: "shiftCompleted",
            key: "shiftCompleted",
            align: "center",
          },
        ]
      : []),
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      align: "center",
      render: (value) => (value ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Button
          type={record.isActive ? "primary" : "default"}
          style={{ width: 100 }}
          loading={isUpdating}
          onClick={async () => {
            const newStatus = !record.isActive;

            // Optimistic UI update for better UX
            setData((prevData) =>
              prevData.map((user) =>
                user._id === record._id
                  ? { ...user, isActive: newStatus }
                  : user
              )
            );

            try {
              // ✅ Correct payload: id + isActive
              await updateUserStatus({
                id: record._id,
                isActive: newStatus,
              }).unwrap();

              toast.success(
                `User status updated to ${newStatus ? "Active" : "Inactive"}`
              );

              // ✅ Force server refresh after mutation
              refetch();
            } catch (error) {
              toast.error("Failed to update user status");
              console.error("Update Error:", error);
            }
          }}
        >
          {record.isActive ? "Active" : "Inactive"}
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32 w-full">
        <Spin size="large" />
      </div>
    );
  }

  console.log("Users Data:", usersData?.data);

  return (
    <div>
      {/* Header Buttons + Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-0 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Button
            type="primary"
            onClick={() => toggleTab("Employee")}
            className={`px-[50px] py-[20px] rounded-lg text-[16px] font-medium ${
              activeTab === "Employee"
                ? "bg-primary !text-white border-primary"
                : "bg-white !text-secondary border-primary hover:bg-primary hover:!text-white"
            }`}
          >
            Employee
          </Button>

          <Button
            type="primary"
            onClick={() => toggleTab("Client")}
            className={`px-[50px] py-[20px] rounded-lg text-[16px] font-medium ${
              activeTab === "Client"
                ? "bg-primary !text-white border-primary"
                : "bg-white !text-secondary border-primary hover:bg-primary hover:!text-white"
            }`}
          >
            Client
          </Button>

          {/* Status Filter */}
          <Select
            value={filterStatus}
            onChange={(value) => setFilterStatus(value)}
            style={{ width: 150, height: 42 }}
            className="mt-2 sm:mt-0"
          >
            <Option value="All">All</Option>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </div>

        {/* Search Box */}
        <div className="flex flex-col sm:flex-row gap-5 mt-2 lg:mt-0">
          <Input.Search
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            enterButton
            className="custom-search !w-full sm:!w-[400px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          dataSource={filteredData}
          columns={columns}
          loading={tableLoading}
          pagination={{ pageSize: 10 }}
          bordered={false}
          size="small"
          rowClassName="custom-row"
          components={components}
          className="custom-table"
          scroll={{ x: "max-content" }}
          rowKey="_id"
        />
      </div>

      {/* User Modal */}
      <UserModal
        visible={isModalVisible}
        onSave={handleSave}
        form={modalForm}
        roles={roles}
        record={selectedRecord}
        isEdit={isEdit}
      />
    </div>
  );
};

export default LoginCredentials;
