import React from 'react';
import { 
  LayoutDashboard, 
  Files, 
  MessageSquare, 
  Settings, 
  Upload, 
  Bell, 
  Search, 
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function PortalMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col bg-[#0A0A0F] font-sans">
      {/* Browser Chrome */}
      <div className="h-12 bg-[#1A1A24] border-b border-white/10 flex items-center px-4 gap-4">
        {/* Traffic Lights */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        
        {/* URL Bar */}
        <div className="flex-1 max-w-xl mx-auto bg-[#0A0A0F] rounded-md h-7 flex items-center px-3 justify-center border border-white/5">
          <span className="text-xs text-gray-400 font-medium">portal.mitchellcpa.com</span>
        </div>
        
        {/* Spacer to balance traffic lights */}
        <div className="w-12"></div>
      </div>

      {/* App Body */}
      <div className="flex h-[600px]">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/10 bg-[#0F0F16] flex flex-col">
          <div className="p-6">
            <div className="text-[#6C63FF] font-bold text-xl tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#6C63FF] flex items-center justify-center text-white">
                M
              </div>
              MitchellCPA
            </div>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: true },
              { icon: Files, label: 'Documents' },
              { icon: MessageSquare, label: 'Messages', badge: '3' },
              { icon: Settings, label: 'Settings' }
            ].map((item, i) => (
              <a 
                key={i} 
                href="#" 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.active 
                    ? 'bg-[#6C63FF]/10 text-[#6C63FF]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-[#6C63FF] text-white text-[10px] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-[#6C63FF] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#0F0F16] flex items-center justify-center border border-white/10">
                  <span className="text-xs font-bold text-white">JD</span>
                </div>
              </div>
              <div className="text-sm">
                <div className="text-white font-medium">John Doe</div>
                <div className="text-gray-500 text-xs">Client</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#0A0A0F]">
          {/* Top Bar */}
          <div className="h-20 border-b border-white/10 flex items-center justify-between px-8">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Mitchell & Associates</h1>
              <p className="text-sm text-gray-400 mt-1">Client Portal Dashboard</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-400">
                <button className="hover:text-white transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#6C63FF]"></span>
                </button>
              </div>
              
              <button className="bg-[#6C63FF] hover:bg-[#5a52d9] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(108,99,255,0.3)]">
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-8 flex-1 overflow-y-auto">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Action Required', value: '2', icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                { label: 'Pending Review', value: '4', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                { label: 'Completed', value: '18', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#1A1A24] border border-white/5 rounded-xl p-5 flex items-start justify-between group hover:border-white/10 transition-colors cursor-default">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${stat.bg} ${stat.border}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Uploads Table */}
            <div className="bg-[#1A1A24] border border-white/5 rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Recent Uploads</h2>
                <button className="text-[#6C63FF] text-sm font-medium hover:text-white transition-colors">View All</button>
              </div>
              
              <div className="w-full">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-white/5">
                  <div className="col-span-5">Document Name</div>
                  <div className="col-span-3">Date Added</div>
                  <div className="col-span-3">Status</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>
                
                {[
                  { name: 'Tax Return 2024.pdf', date: 'Today, 2:45 PM', status: 'Completed', color: 'emerald' },
                  { name: 'W-2 Forms.pdf', date: 'Yesterday, 9:15 AM', status: 'Processing', color: 'blue' },
                  { name: 'Engagement Letter.docx', date: 'Oct 24, 2024', status: 'Action Required', color: 'amber' },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/5 hover:bg-white/[0.02] transition-colors last:border-0 cursor-pointer">
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                        <Files className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-200">{row.name}</span>
                    </div>
                    <div className="col-span-3 text-sm text-gray-400">
                      {row.date}
                    </div>
                    <div className="col-span-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        row.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        row.status === 'Processing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {row.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                        {row.status === 'Processing' && <Clock className="w-3 h-3" />}
                        {row.status === 'Action Required' && <AlertCircle className="w-3 h-3" />}
                        {row.status}
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button className="text-gray-500 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
