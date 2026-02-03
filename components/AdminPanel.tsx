import React, { useState } from 'react';
import { ShieldCheck, Users, Search, MoreVertical, UserPlus, Ban, ChevronUp, ChevronDown, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { UserRole } from '../types';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
  lastActive: string;
  avatar: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: UserRole.ADMIN,
    status: 'active',
    joinedAt: '2025-06-15',
    lastActive: '2 phút trước',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    role: UserRole.MANAGER,
    status: 'active',
    joinedAt: '2025-08-20',
    lastActive: '1 giờ trước',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    role: UserRole.USER,
    status: 'active',
    joinedAt: '2025-10-05',
    lastActive: '3 giờ trước',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    role: UserRole.USER,
    status: 'pending',
    joinedAt: '2026-01-28',
    lastActive: 'Chưa đăng nhập',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    role: UserRole.USER,
    status: 'inactive',
    joinedAt: '2025-07-10',
    lastActive: '30 ngày trước',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face'
  },
];

const AdminPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 font-medium">Admin</span>;
      case UserRole.MANAGER:
        return <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400 font-medium">Manager</span>;
      case UserRole.USER:
        return <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 font-medium">User</span>;
    }
  };

  const getStatusIcon = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const handleChangeRole = (user: User) => {
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
        <div className="space-y-2">
           <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">Quản Lý Người Dùng</h2>
           <p className="text-sm md:text-base text-white/60 max-w-xl">Quản lý tài khoản, phân quyền và theo dõi hoạt động người dùng.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all text-sm font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)]">
           <UserPlus className="w-4 h-4" /> Thêm người dùng
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng người dùng', value: '1,234', color: 'text-blue-400' },
          { label: 'Đang hoạt động', value: '1,189', color: 'text-green-400' },
          { label: 'Chờ duyệt', value: '23', color: 'text-yellow-400' },
          { label: 'Bị khóa', value: '22', color: 'text-red-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc email..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {['Tất cả', UserRole.ADMIN, UserRole.MANAGER, UserRole.USER].map(role => (
            <button
              key={role}
              onClick={() => setFilterRole(role === 'Tất cả' ? null : role as UserRole)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                (role === 'Tất cả' && !filterRole) || filterRole === role
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {role === 'Tất cả' ? 'Tất cả' : role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/[0.02] border-b border-white/5">
            <tr>
              <th className="p-4 text-sm font-medium text-gray-400">Người dùng</th>
              <th className="p-4 text-sm font-medium text-gray-400 hidden md:table-cell">Vai trò</th>
              <th className="p-4 text-sm font-medium text-gray-400 hidden lg:table-cell">Ngày tham gia</th>
              <th className="p-4 text-sm font-medium text-gray-400">Trạng thái</th>
              <th className="p-4 text-sm font-medium text-gray-400 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  {getRoleBadge(user.role)}
                </td>
                <td className="p-4 text-sm text-gray-400 hidden lg:table-cell">
                  {user.joinedAt}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(user.status)}
                    <span className="text-sm text-gray-400">{user.lastActive}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleChangeRole(user)}
                      className="p-2 bg-white/5 hover:bg-purple-500/20 rounded-lg text-gray-400 hover:text-purple-400 transition-colors"
                      title="Đổi vai trò"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 bg-white/5 hover:bg-blue-500/20 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                      title="Khóa tài khoản"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowRoleModal(false)}
        >
          <div 
            className="glass-panel max-w-md w-full rounded-[24px] p-6"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4">Thay đổi vai trò</h3>
            <p className="text-gray-400 mb-6">
              Chọn vai trò mới cho <span className="text-white font-medium">{selectedUser.name}</span>
            </p>

            <div className="space-y-3 mb-6">
              {[UserRole.USER, UserRole.MANAGER, UserRole.ADMIN].map(role => (
                <button
                  key={role}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedUser.role === role
                      ? 'bg-blue-500/20 border-blue-500/50 text-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <p className="font-medium capitalize">{role}</p>
                  <p className="text-xs text-gray-500">
                    {role === UserRole.USER && 'Quyền cơ bản, xem báo cáo và dữ liệu'}
                    {role === UserRole.MANAGER && 'Quản lý người dùng, tạo báo cáo'}
                    {role === UserRole.ADMIN && 'Toàn quyền quản trị hệ thống'}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowRoleModal(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={() => setShowRoleModal(false)}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
