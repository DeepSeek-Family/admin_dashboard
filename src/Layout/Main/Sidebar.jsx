import { Menu, Modal } from "antd";
import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import {
  Settings,
  People,
  SubscriptionManagement,
  FileIcon,
  CategoryIcon,
} from "../../components/common/Svg";
import image4 from "../../assets/image4.png";
import { useUser } from "../../provider/User";

const Sidebar = ({ collapsed, isMobile }) => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const showLogoutConfirm = () => setIsLogoutModalOpen(true);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("user");
    setIsLogoutModalOpen(false);
    navigate("/auth/login");
  };
  const handleCancel = () => setIsLogoutModalOpen(false);

  const isItemActive = (itemKey) =>
    selectedKey === itemKey ||
    (itemKey === "subMenuSetting" &&
      ["/profile", "/terms-and-conditions", "/privacy-policy"].includes(
        selectedKey
      ));

  const renderIcon = (IconComponent, itemKey) => {
    const isActive = isItemActive(itemKey);
    return (
      <div
        style={{ width: 20, height: 20 }}
        className={isActive ? "svg-active" : ""}
      >
        <IconComponent
          className="menu-icon"
          fill={isActive ? "#ffffff" : "#1E1E1E"}
        />
      </div>
    );
  };

  const rawMenuItems = useMemo(() => [
    {
      key: "/dashboard",
      label: (
        <Link to="/dashboard">{collapsed ? "" : "Dashboard Overview"}</Link>
      ),
      //
    },
    {
      key: "/user-management",
      label: (
        <Link to="/user-management">{collapsed ? "" : "User Management"}</Link>
      ),
    },
    {
      key: "/subscription-management",
      label: (
        <Link to="/subscription-management">
          {collapsed ? "" : "Subscription Management"}
        </Link>
      ),
    },
    {
      key: "/reports-analytics",
      label: (
        <Link to="/reports-analytics">
          {collapsed ? "" : "Reports & Analytics"}
        </Link>
      ),
    },
    {
      key: "subMenuSetting",
      label: collapsed ? "" : "Settings",

      children: [
        {
          key: "/profile",
          label: <Link to="/profile">{collapsed ? "" : "Update Profile"}</Link>,
        },
        {
          key: "/terms-and-conditions",
          label: (
            <Link to="/terms-and-conditions">
              {collapsed ? "" : "Terms & Conditions"}
            </Link>
          ),
        },
        {
          key: "/privacy-policy",
          label: (
            <Link to="/privacy-policy">
              {collapsed ? "" : "Privacy Policy"}
            </Link>
          ),
        },
      ],
    },
    {
      key: "/logout",
      label: <p onClick={showLogoutConfirm}>{collapsed ? "" : "Logout"}</p>,
    },
  ], [collapsed]);

  const menuItems = useMemo(() =>
    rawMenuItems.filter(
      (item) => !item.role || item.role.includes(user?.role)
    ), [rawMenuItems, user?.role]
  );

  const menuItemsForRender = useMemo(() =>
    menuItems.map((item) => ({
      ...item,
      icon: item.key === "/logout" ? <IoIosLogOut size={24} /> : renderIcon(
        item.key === "/dashboard" ? FileIcon :
        item.key === "/user-management" ? People :
        item.key === "/subscription-management" ? SubscriptionManagement :
        item.key === "/reports-analytics" ? CategoryIcon :
        item.key === "subMenuSetting" ? Settings : null,
        item.key
      ),
      children: item.children
        ? item.children.map((subItem) => ({ ...subItem }))
        : undefined,
    })), [menuItems, selectedKey]
  );

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path ||
        (item.children && item.children.some((sub) => sub.key === path))
    );
    if (selectedItem) {
      if (selectedKey !== path) setSelectedKey(path);
      if (selectedItem.children) {
        if (!openKeys.includes(selectedItem.key)) setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find(
          (item) =>
            item.children && item.children.some((sub) => sub.key === path)
        );
        if (parentItem && !openKeys.includes(parentItem.key)) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path, menuItems, selectedKey, openKeys]);

  return (
    <div
      className={`h-full flex flex-col bg-white transition-all duration-300 z-40 ${
        isMobile
          ? `fixed top-0 left-0 w-64 h-full shadow-lg transform ${
              collapsed ? "-translate-x-full" : "translate-x-0"
            }`
          : ""
      }`}
      style={{ width: collapsed && !isMobile ? 80 : 250 }}
    >
      {/* Logo */}
      {!collapsed && (
        <Link
          to={"/"}
          className="logo-container flex items-center justify-center py-11"
        >
          <img src={image4} alt="logo" className="w-40 " />
        </Link>
      )}

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          inlineCollapsed={collapsed && !isMobile}
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          className="font-poppins text-black border-none"
          items={menuItemsForRender}
        />
      </div>

      {/* Logout Modal */}
      <Modal
        centered
        title="Confirm Logout"
        open={isLogoutModalOpen}
        onOk={handleLogout}
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
};

export default Sidebar;
