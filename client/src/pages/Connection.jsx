// // import React from 'react'
// // import {Users, UserPlus, UserCheck, UserRoundPen, MessageSquare} from 'lucide-react'
// // import { useNavigate } from 'react-router-dom'
// // import {
// //   dummyConnectionsData as connections,
// //   dummyFollowersData as followers,
// //   dummyFollowingData as following,
// //   dummyPendingConnectionsData as pendingConnections,
// // } from '../assets/assets'

// // function Connection() {

// //   const navigate = useNavigate()

// //   const dataArray = [
// //     {label: 'Followers', value: followers, icon: Users},
// //     {label: 'Following', value: following, icon: UserCheck},
// //     {label: 'Pending', value: pendingConnections, icon: UserRoundPen},
// //     {label: 'Connections', value: connections, icon: UserPlus},
// //   ]

// //   return (
// //     <div className='min-h-screen bg-slate-50'>
// //       <div className='max-w-6xl mx-auto p-6'>

// //         {/* Title */}
// //         <div className='mb-8'>
// //           <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
// //           <p className='text-slate-600'>Manage your network and discover new connections</p>
// //         </div>

// //         {/* Counts */}
// //         <div className='mb-8 flex flex-wrap gap-3'>
// //           {
// //             dataArray.map((item, index) => (
// //               <div key={index} className='flex flex-col items-center justify-center gap-1 border h-20 w-40 border-gray-200 bg-white shadow rounded-md'>
// //                 <b className='text-slate-600'>{item.label}</b>
// //               </div>
// //             ))
// //           }
// //         </div>

// //       </div>
// //     </div>
// //   )
// // }

// // export default Connection









// import React, { useEffect, useState } from 'react'
// import {Users, UserPlus, UserCheck, UserRoundPen, MessageSquare} from 'lucide-react'
// import { data, useNavigate } from 'react-router-dom'
// import { useSelector,useDispatch } from 'react-redux'
// import { useAuth } from '@clerk/clerk-react'
// import { fetchConnections } from '../features/connections/connectionsSlice.js'
// import toast from 'react-hot-toast'
// import api from '../api/axios.js'

// function Connection() {

//   const [currentTab, setCurrentTab] = useState('Followers')

//   const navigate = useNavigate()
//   const { getToken } = useAuth()
//   const dispatch = useDispatch()

//   const {connections, pendingConnections, followers, following} = useSelector((state) => state.connections)

//   const dataArray = [
//     {label: 'Followers', value: followers, icon: Users},
//     {label: 'Following', value: following, icon: UserCheck},
//     {label: 'Pending', value: pendingConnections, icon: UserRoundPen},
//     {label: 'Connections', value: connections, icon: UserPlus},
//   ]

//   const handleUnfollow = async (userId) => {
//     try {
//       const { data } = await api.post('/api/user/unfollow', {id: userId}, {
//         headers: { Authorization: `Bearer ${await getToken()}` }
//       })
//       if(data.success) {
//         toast.success(data.message)
//         dispatch(fetchConnections(await getToken()))
//       } else {
//         toast(data.message)
//       }
//     } catch (error) {
//       toast(data.message);
//     }
//   }

//   const acceptConnection = async (userId) => {
//     try {
//       const { data } = await api.post('/api/user/accept', {id: userId}, {
//         headers: { Authorization: `Bearer ${await getToken()}` }
//       })
//       if(data.success) {
//         toast.success(data.message)
//         dispatch(fetchConnections(await getToken()))
//       } else {
//         toast(data.message)
//       }
//     } catch (error) {
//       toast(data.message);
//     }
//   }

//   useEffect(() => {
//     getToken().then((token) => {
//       dispatch(fetchConnections(token))
//     })
//   }, [])

//   return (
//     <div className='min-h-screen bg-slate-50'>
//       <div className='max-w-6xl mx-auto p-6'>

//         {/* Title */}
//         <div className='mb-8'>
//           <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
//           <p className='text-slate-600'>Manage your network and discover new connections</p>
//         </div>

//         {/* Counts */}
//         <div className='mb-8 flex flex-wrap gap-3'>
//           {
//             dataArray.map((item, index) => {
//               const IconComponent = item.icon
//               return (
//                 <div key={index} className='flex flex-col items-center justify-center gap-2 border h-20 w-40 border-gray-200 bg-white shadow rounded-md'>
//                   <div className='flex items-center gap-2'>
//                     <IconComponent size={20} className='text-slate-500' />
//                     <span className='text-2xl font-bold text-slate-800'>{item.value.length}</span>
//                   </div>
//                   <b className='text-slate-600 text-sm'>{item.label}</b>
//                 </div>
//               )
//             })
//           }
//         </div>

//         {/* Tab */}
//         <div className='inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm'>
//           {
//             dataArray.map((tab) => (
//               <button onClick={() => setCurrentTab(tab.label)} key={tab.label} className={`cursor-pointer flex items-center px-3 py-1 text-sm rounded-md transition-colors ${currentTab === tab.label ? 'bg-white font-medium text-black' : 'text-gray-500 hover:text-black'} `}>
//                 <tab.icon className='w-4 h-4'/>
//                 <span className='ml-1'>{tab.label}</span>
//                 {tab.count !== undefined && (
//                   <span className='ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full'>{tab.count}</span>
//                 )}
//               </button>
//             ))
//           }
//         </div>

//         {/* Connections */}
//         <div className='flex flex-wrap gap-6 mt-6'>
//           {
//             dataArray.find((item) => item.label === currentTab).value.map((user) => (
//               <div key={user._id} className='w-full max-w-88 flex gap-5 p-6 bg-white shadow rounded-md'>
//                 <img src={user.profile_picture} alt="" className='rounded-full w-12 h-12 shadow-md mx-auto' />
//                 <div className='flex-1'>
//                   <p className='font-medium text-slate-700'>{user.full_name}</p>
//                   <p className='text-slate-500'>@{user.username}</p>
//                   <p className='text-sm text-gray-600'>{user.bio.slice(0, 30)}...</p>
//                   <div className='flex max-sm:flex-col gap-2 mt-4'>
//                     {
//                       <button onClick={() => navigate(`/profile/${user._id}`)} className='w-full p-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white cursor-pointer'>
//                         View Profile
//                       </button>
//                     }
//                     {
//                       currentTab === 'Following' && (
//                         <button onClick={() => handleUnfollow(user._id)} className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer'>
//                           Unfollow
//                         </button>
//                       )
//                     }
//                     {
//                       currentTab === 'Pending' && (
//                         <button onClick={() => acceptConnection(user._id)} className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer'>
//                           Accept
//                         </button>
//                       )
//                     }
//                     {
//                       currentTab === 'Connections' && (
//                         <button onClick={() => navigate(`/messages/${user._id}`)} className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1'>
//                           <MessageSquare className='w-4 h-4'/>
//                           Message
//                         </button>
//                       )
//                     }
//                   </div>

//                 </div>

//               </div>
//             ))
//           }
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Connection












import React, { useEffect, useState } from 'react'
import {Users, UserPlus, UserCheck, UserRoundPen, MessageSquare} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import { fetchConnections } from '../features/connections/connectionsSlice.js'
import toast from 'react-hot-toast'
import api from '../api/axios.js'

function Connection() {
  const [currentTab, setCurrentTab] = useState('Followers')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { getToken } = useAuth()
  const dispatch = useDispatch()

  const {connections, pendingConnections, followers, following, isLoading} = useSelector((state) => state.connections)

  // Ensure we have arrays even if data is not loaded yet
  const safeFollowers = followers || []
  const safeFollowing = following || []
  const safePendingConnections = pendingConnections || []
  const safeConnections = connections || []

  const dataArray = [
    {label: 'Followers', value: safeFollowers, icon: Users},
    {label: 'Following', value: safeFollowing, icon: UserCheck},
    {label: 'Pending', value: safePendingConnections, icon: UserRoundPen},
    {label: 'Connections', value: safeConnections, icon: UserPlus},
  ]

  const handleUnfollow = async (userId) => {
    try {
      setLoading(true)
      const token = await getToken()
      const { data } = await api.post('/api/user/unfollow', {id: userId}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if(data.success) {
        toast.success(data.message)
        dispatch(fetchConnections(token))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Unfollow error:', error)
      toast.error(error.response?.data?.message || 'Failed to unfollow user')
    } finally {
      setLoading(false)
    }
  }

  const acceptConnection = async (userId) => {
    try {
      setLoading(true)
      const token = await getToken()
      const { data } = await api.post('/api/user/accept', {id: userId}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if(data.success) {
        toast.success(data.message)
        dispatch(fetchConnections(token))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Accept connection error:', error)
      toast.error(error.response?.data?.message || 'Failed to accept connection')
    } finally {
      setLoading(false)
    }
  }

  const loadConnections = async () => {
    try {
      setLoading(true)
      const token = await getToken()
      await dispatch(fetchConnections(token))
    } catch (error) {
      console.error('Load connections error:', error)
      toast.error('Failed to load connections')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConnections()
  }, [dispatch, getToken])

  // Get current tab data
  const currentTabData = dataArray.find((item) => item.label === currentTab)?.value || []

  if (loading && (!connections && !followers && !following && !pendingConnections)) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
          <p className='text-slate-600'>Loading connections...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-6xl mx-auto p-6'>

        {/* Title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
          <p className='text-slate-600'>Manage your network and discover new connections</p>
        </div>

        {/* Counts */}
        <div className='mb-8 flex flex-wrap gap-3'>
          {
            dataArray.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index} className='flex flex-col items-center justify-center gap-2 border h-20 w-40 border-gray-200 bg-white shadow rounded-md'>
                  <div className='flex items-center gap-2'>
                    <IconComponent size={20} className='text-slate-500' />
                    <span className='text-2xl font-bold text-slate-800'>{item.value.length}</span>
                  </div>
                  <b className='text-slate-600 text-sm'>{item.label}</b>
                </div>
              )
            })
          }
        </div>

        {/* Tab */}
        <div className='inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm mb-6'>
          {
            dataArray.map((tab) => (
              <button 
                onClick={() => setCurrentTab(tab.label)} 
                key={tab.label} 
                className={`cursor-pointer flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  currentTab === tab.label 
                    ? 'bg-indigo-100 font-medium text-indigo-700' 
                    : 'text-gray-500 hover:text-black hover:bg-gray-50'
                }`}
              >
                <tab.icon className='w-4 h-4'/>
                <span className='ml-2'>{tab.label}</span>
                <span className='ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full'>
                  {tab.value.length}
                </span>
              </button>
            ))
          }
        </div>

        {/* Current Tab Title */}
        <div className='mb-4'>
          <h2 className='text-xl font-semibold text-slate-800'>{currentTab}</h2>
          <p className='text-slate-600 text-sm'>
            {currentTabData.length} {currentTab.toLowerCase()}
          </p>
        </div>

        {/* Connections */}
        {currentTabData.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
              currentTabData.map((user) => (
                <div key={user._id} className='bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow'>
                  <div className='flex items-start gap-4'>
                    <img 
                      src={user.profile_picture || '/default-avatar.png'} 
                      alt={user.full_name} 
                      className='rounded-full w-16 h-16 object-cover border-2 border-gray-200' 
                      onError={(e) => {
                        e.target.src = '/default-avatar.png'
                      }}
                    />
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold text-slate-800 truncate'>{user.full_name}</h3>
                      <p className='text-slate-500 text-sm truncate'>@{user.username}</p>
                      <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
                        {user.bio ? user.bio.slice(0, 60) + (user.bio.length > 60 ? '...' : '') : 'No bio available'}
                      </p>
                      
                      <div className='flex flex-col gap-2 mt-4'>
                        <button 
                          onClick={() => navigate(`/profile/${user._id}`)} 
                          className='w-full py-2 px-4 text-sm rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white'
                          disabled={loading}
                        >
                          View Profile
                        </button>
                        
                        {currentTab === 'Following' && (
                          <button 
                            onClick={() => handleUnfollow(user._id)} 
                            className='w-full py-2 px-4 text-sm rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 active:scale-95 transition'
                            disabled={loading}
                          >
                            {loading ? 'Processing...' : 'Unfollow'}
                          </button>
                        )}
                        
                        {currentTab === 'Pending' && (
                          <button 
                            onClick={() => acceptConnection(user._id)} 
                            className='w-full py-2 px-4 text-sm rounded-lg bg-green-50 hover:bg-green-100 text-green-600 border border-green-200 active:scale-95 transition'
                            disabled={loading}
                          >
                            {loading ? 'Processing...' : 'Accept'}
                          </button>
                        )}
                        
                        {currentTab === 'Connections' && (
                          <button 
                            onClick={() => navigate(`/messages/${user._id}`)} 
                            className='w-full py-2 px-4 text-sm rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 active:scale-95 transition flex items-center justify-center gap-2'
                          >
                            <MessageSquare className='w-4 h-4'/>
                            Message
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <div className='text-center py-12'>
            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center'>
              {dataArray.find(item => item.label === currentTab)?.icon && 
                React.createElement(dataArray.find(item => item.label === currentTab).icon, {
                  size: 32,
                  className: 'text-slate-400'
                })
              }
            </div>
            <h3 className='text-lg font-medium text-slate-800 mb-2'>
              No {currentTab.toLowerCase()} yet
            </h3>
            <p className='text-slate-500 max-w-sm mx-auto'>
              {currentTab === 'Followers' && 'No one is following you yet. Start connecting with others!'}
              {currentTab === 'Following' && "You're not following anyone yet. Discover and follow interesting people!"}
              {currentTab === 'Pending' && 'No pending connection requests at the moment.'}
              {currentTab === 'Connections' && 'No connections yet. Start building your network!'}
            </p>
            {(currentTab === 'Followers' || currentTab === 'Following' || currentTab === 'Connections') && (
              <button 
                onClick={() => navigate('/discover')}
                className='mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
              >
                Discover People
              </button>
            )}
          </div>
        )}

        {/* Loading overlay for actions */}
        {loading && (connections || followers || following || pendingConnections) && (
          <div className='fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 shadow-xl'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4'></div>
              <p className='text-slate-600'>Processing...</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Connection
