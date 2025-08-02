export default function TicketStats({ stats }) {
  const statItems = [
    {
      label: 'Total Tickets',
      value: stats.total || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'text-accent',
      bgColor: 'bg-accent bg-opacity-10'
    },
    {
      label: 'Open',
      value: stats.open || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      label: 'In Progress',
      value: stats.inProgress || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'Resolved',
      value: stats.resolved || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.bgColor} ${item.color}`}>
              {item.icon}
            </div>
          </div>
          
          {/* Optional: Add percentage change */}
          {stats.changes && stats.changes[index] && (
            <div className="mt-2">
              <span className={`text-sm ${stats.changes[index] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.changes[index] >= 0 ? '+' : ''}{stats.changes[index]}%
              </span>
              <span className="text-gray-500 text-sm ml-1">from last week</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
