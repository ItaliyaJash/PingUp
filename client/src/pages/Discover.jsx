// import React, { useEffect, useState } from 'react'
// import { dummyConnectionsData, dummyUserData } from '../assets/assets' // Import dummyUserData
// import { Search } from 'lucide-react'
// import UserCard from '../components/UserCard'
// import Loading from '../components/Loading'
// import { useAuth } from '@clerk/clerk-react'
// import api from '../api/axios.js'
// import toast from 'react-hot-toast'
// import { useDispatch } from 'react-redux'
// import { fetchUser } from '../features/user/userSlice.js'

// function Discover() {
//   const dispatch = useDispatch()
//   const [input, setInput] = useState('')
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(false)

//   const { getToken } = useAuth()

//   const handleSearch = async (e) => {
//     if (e.key === 'Enter') {
//       try {
//         setUsers([])
//         setLoading(true)
//         const { data } = await api.post('/api/user/discover', {input}, {
//           headers: { Authorization: `Bearer ${await getToken()}` }
//         })
//         data.success ? setUsers(data.users) : toast.error(data.message)
//         setLoading(false)
//         setInput('')
//       } catch (error) {
//         toast.error(error.message)
//       }
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     getToken().then((token) => {
//       dispatch(fetchUser(token))
//     })
//   },  [])

//   return (
//     <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
//       <div className='max-w-6xl mx-auto p-6'>
//         {/* Title */}
//         <div className='mb-8'>
//           <h1 className='text-3xl font-bold text-slate-900 mb-2'>Discover People</h1>
//           <p className='text-slate-600'>Connect with amazing people and grow your network</p>
//         </div>

//         {/* search */}
//         <div className='mb-8 shadow-md rounded-md border border-slate-200/60 bg-white/80'>
//           <div className='p-6'>
//             <div className='relative'>
//               <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
//               <input
//                 type="text"
//                 placeholder='Search people by name, username, bio, or location...'
//                 className='pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm'
//                 onChange={(e) => setInput(e.target.value)}
//                 value={input}
//                 onKeyUp={handleSearch}
//               />
//             </div>
//           </div>
//         </div>

//         <div className='flex flex-wrap gap-6 justify-center'>
//           {users.map((user) => (
//             <UserCard user={user} key={user._id} currentUser={dummyUserData} />
//           ))}
//         </div>

//         {loading && <Loading height='60vh' />}
//       </div>
//     </div>
//   )
// }

// export default Discover








import React, { useEffect, useState } from 'react'
import { dummyConnectionsData, dummyUserData } from '../assets/assets'
import { Search } from 'lucide-react'
import UserCard from '../components/UserCard'
import Loading from '../components/Loading'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../features/user/userSlice.js'

function Discover() {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const { getToken } = useAuth()

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && input.trim()) {
      try {
        setUsers([])
        setLoading(true)
        
        const token = await getToken()
        const { data } = await api.post('/api/user/discover', {input: input.trim()}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if (data.success) {
          setUsers(data.users) // Fixed: now correctly accessing data.users
          if (data.users.length === 0) {
            toast.success('No users found matching your search')
          } else {
            toast.success(`Found ${data.users.length} users`)
          }
        } else {
          toast.error(data.message)
        }
        
      } catch (error) {
        console.error('Search error:', error)
        toast.error(error.response?.data?.message || 'Something went wrong during search')
      } finally {
        setLoading(false)
        setInput('')
      }
    }
  }

  // Optional: Add a search button for better UX
  const handleSearchButton = async () => {
    if (input.trim()) {
      try {
        setUsers([])
        setLoading(true)
        
        const token = await getToken()
        const { data } = await api.post('/api/user/discover', {input: input.trim()}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if (data.success) {
          setUsers(data.users)
          if (data.users.length === 0) {
            toast.success('No users found matching your search')
          } else {
            toast.success(`Found ${data.users.length} users`)
          }
        } else {
          toast.error(data.message)
        }
        
      } catch (error) {
        console.error('Search error:', error)
        toast.error(error.response?.data?.message || 'Something went wrong during search')
      } finally {
        setLoading(false)
        setInput('')
      }
    } else {
      toast.error('Please enter a search term')
    }
  }

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchUser(token))
    })
  }, [dispatch, getToken])

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* Title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Discover People</h1>
          <p className='text-slate-600'>Connect with amazing people and grow your network</p>
        </div>

        {/* Search */}
        <div className='mb-8 shadow-md rounded-md border border-slate-200/60 bg-white/80'>
          <div className='p-6'>
            <div className='relative flex gap-2'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
                <input
                  type="text"
                  placeholder='Search people by name, username, bio, or location...'
                  className='pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  onKeyUp={handleSearch}
                  disabled={loading}
                />
              </div>
              {/* Optional search button */}
              <button
                onClick={handleSearchButton}
                disabled={loading || !input.trim()}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                Search
              </button>
            </div>
            <p className='text-sm text-slate-500 mt-2'>Press Enter or click Search to find users</p>
          </div>
        </div>

        {/* Results */}
        {!loading && users.length > 0 && (
          <div className='mb-4'>
            <p className='text-slate-600'>Found {users.length} user{users.length !== 1 ? 's' : ''}</p>
          </div>
        )}

        <div className='flex flex-wrap gap-6 justify-center'>
          {users.map((user) => (
            <UserCard user={user} key={user._id} currentUser={dummyUserData} />
          ))}
        </div>

        {loading && <Loading height='60vh' />}

        {/* No results message */}
        {!loading && users.length === 0 && input === '' && (
          <div className='text-center text-slate-500 mt-12'>
            <Search className='w-16 h-16 mx-auto mb-4 opacity-30' />
            <p className='text-lg'>Search for people to connect with</p>
            <p className='text-sm'>Enter a name, username, bio, or location to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Discover