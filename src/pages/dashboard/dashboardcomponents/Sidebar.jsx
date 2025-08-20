import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-full shadow-lg">
      {/* Logo / Branding */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold tracking-wide">MidTrip.AI</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="mb-6">
          <h2 className="text-gray-400 uppercase text-sm font-semibold mb-2">Home</h2>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-lg transition ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            🏠 Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-lg transition ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            👥 Users
          </NavLink>
        </div>

        <div className="mb-6">
          <h2 className="text-gray-400 uppercase text-sm font-semibold mb-2">System Settings</h2>
          <NavLink
            to="/admin/pricing"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-lg transition ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            💰 Pricing
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
