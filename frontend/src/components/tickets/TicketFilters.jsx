export default function TicketFilters({ 
  searchTerm, 
  onSearchChange, 
  filter, 
  onFilterChange, 
  sortBy, 
  onSortChange 
}) {
  const filterOptions = [
    { value: 'all', label: 'All Tickets' },
    { value: 'open', label: 'Open' },
    { value: 'in progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ]

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'replies', label: 'Most Replies' },
    { value: 'priority', label: 'High Priority' }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Tickets
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-field pl-10"
              placeholder="Search by subject or description..."
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Filter by Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="input-field"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="input-field"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-2">Quick Filters:</p>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => onFilterChange('open')}
            className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors"
          >
            Open Tickets
          </button>
          <button 
            onClick={() => onFilterChange('high-priority')}
            className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full hover:bg-orange-200 transition-colors"
          >
            High Priority
          </button>
          <button 
            onClick={() => onSearchChange('bug')}
            className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
          >
            Bug Reports
          </button>
          <button 
            onClick={() => {
              onFilterChange('all')
              onSearchChange('')
              onSortChange('recent')
            }}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  )
}
