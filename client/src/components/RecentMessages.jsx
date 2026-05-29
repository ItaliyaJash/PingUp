// import React, { useEffect, useState } from 'react'
// import { dummyConnectionsData } from '../assets/assets'
// import { Link } from 'react-router-dom'
// import moment from 'moment'

// function RecentMessages() {

//     const [messages, setMessages] = useState([])

//     const fetchRecentMessages = async () => {
//         setMessages(dummyConnectionsData)
//     }

//     useEffect(() => {
//         fetchRecentMessages()
//     }, [])

//     return (
//         <div className='bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-8'>
//             <h3 className='font-semibold text-slate-800 mb-4'>Recent Messages</h3>
//             <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
//                 {
//                     messages.map((message, index) => (
//                         <Link key={index} className='flex items-start gap-2 py-2 hover:bg-slate-100'>
//                             <img src={message.profile_picture} alt="" className='w-8 h-8 rounded-full' />
//                             <div className='w-full'>
//                                 <div className='flex justify-between'>
//                                     <p className='font-medium'>{message.full_name}</p>
//                                     <p className='text-[10px] text-slate-400'>{moment(message.createdAt).fromNow()}</p>
//                                     <div className='flex justify-between'>
//                                         <p className='text-gray-500'>
//                                             {message.text ? message.text : 'Media'}
//                                         </p>
//                                         {!message.seen && <p className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]'>1</p>}
//                                     </div>
//                                 </div>
//                             </div>
//                         </Link>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }

// export default RecentMessages










// import React, { useEffect, useState } from 'react'
// import { dummyConnectionsData } from '../assets/assets'
// import { Link } from 'react-router-dom'
// import moment from 'moment'

// function RecentMessages() {
//   const [messages, setMessages] = useState([])

//   const fetchRecentMessages = async () => {
//     setMessages(dummyConnectionsData)
//   }

//   useEffect(() => {
//     fetchRecentMessages()
//   }, [])

//   return (
//     <div className='bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800'>
//       <h3 className='font-semibold text-slate-800 mb-4'>Recent Messages</h3>
//       <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
//         {messages.map((message, index) => (
//           <Link to={`/messages/${message._id}`}
//             key={index}
//             className='flex items-start gap-2 py-2 px-2 rounded-lg hover:bg-slate-50 transition-colors duration-200'
//           >
//             <img src={message.profile_picture} alt="" className='w-8 h-8 rounded-full object-cover' />
//             <div className='w-full'>
//               <div className='flex justify-between items-center mb-1'>
//                 <p className='font-medium text-slate-900 truncate'>{message.full_name}</p>
//                 <p className='text-[10px] text-slate-400'>{moment(message.createdAt).fromNow()}</p>
//               </div>
//               <div className='flex justify-between items-center'>
//                 <p className='text-gray-500 truncate'>
//                   {message.text ? message.text : 'Media'}
//                 </p>
//                 {!message.seen && (
//                   <p className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] flex-shrink-0'>
//                     1
//                   </p>
//                 )}
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default RecentMessages









// import React, { useEffect, useState } from 'react'
// import { dummyRecentMessagesData } from '../assets/assets'
// import { Link } from 'react-router-dom'
// import moment from 'moment'
// import { useAuth, useUser } from '@clerk/clerk-react'
// import api from '../api/axios.js'
// import toast from 'react-hot-toast'

// function RecentMessages() {
//   const [messages, setMessages] = useState([])
//   const {user} = useUser()
//   const {getToken} = useAuth()

//   const fetchRecentMessages = async () => {
//     try {
//       const token = await getToken()
//       const { data } = await api.get('/api/user/recent-messages', {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       if(data.success) {
//         // Group messages by sender and get the the ;atest message for each sender
//         const groupedMessages = data.messages.reduce((acc, message) => {
//           const senderId = message.from_user_id._id;
//           if(!acc[senderId] || new Date(message.createdAt) > new Date(acc[senderId].createdAt)) {
//             acc[senderId]
//           }
//           return acc;
//         }, {})

//         // Sort messages by data
//         const sortedMessages = Object.values(groupedMessages).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

//         setMessages(sortedMessages)
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     if(user) {
//       fetchRecentMessages()
//       setInterval(fetchRecentMessages, 30000)
//       return () => {clearInterval()}
//     }
//   }, [user])

//   // Default profile picture placeholder
//   const getDefaultImage = (name) => {
//     return `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff&size=32`
//   }

//   return (
//     <div className='bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800'>
//       <h3 className='font-semibold text-slate-800 mb-4'>Recent Messages</h3>
//       <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
//         {messages && messages.length > 0 ? (
//           messages.map((message, index) => (
//             <Link to={`/messages/${message._id || index}`}
//               key={index}
//               className='flex items-start gap-2 py-2 px-2 rounded-lg hover:bg-slate-50 transition-colors duration-200'
//             >
//               <img 
//                 src={message.from_user_id?.profile_picture || getDefaultImage(message.from_user_id?.full_name || 'User')} 
//                 alt="" 
//                 className='w-8 h-8 rounded-full object-cover border border-gray-200' 
//                 onError={(e) => {
//                   e.target.src = getDefaultImage(message.from_user_id?.full_name || 'User')
//                 }}
//               />
//               <div className='w-full'>
//                 <div className='flex justify-between items-center mb-1'>
//                   <p className='font-medium text-slate-900 truncate'>{message.from_user_id?.full_name || 'Unknown User'}</p>
//                   <p className='text-[10px] text-slate-400'>
//                     {message.createdAt ? moment(message.createdAt).fromNow() : ''}
//                   </p>
//                 </div>
//                 <div className='flex justify-between items-center'>
//                   <p className='text-gray-500 truncate'>
//                     {message.text || 'Media'}
//                   </p>
//                   {message.seen === false && (
//                     <p className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] flex-shrink-0'>
//                       1
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <div className='text-center py-4 text-slate-500'>
//             <p>No recent messages</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default RecentMessages









import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAuth, useUser } from '@clerk/clerk-react'
import api from '../api/axios.js'
import toast from 'react-hot-toast'

function RecentMessages() {
  const [messages, setMessages] = useState([])
  const { user } = useUser()
  const { getToken } = useAuth()

  const fetchRecentMessages = async () => {
    try {
      const token = await getToken()
      const { data } = await api.get('/api/user/recent-messages', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        // Group messages by sender/receiver pair, store latest message
        const groupedMessages = data.messages.reduce((acc, message) => {
          // Find "other user" depending on who sent the message
          const otherUserId =
            message.from_user_id?._id === user.id
              ? message.to_user_id?._id
              : message.from_user_id?._id

          if (
            !acc[otherUserId] ||
            new Date(message.createdAt) > new Date(acc[otherUserId].createdAt)
          ) {
            acc[otherUserId] = message
          }
          return acc
        }, {})

        // Sort messages by newest first
        const sortedMessages = Object.values(groupedMessages).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )

        setMessages(sortedMessages)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    let intervalId
    if (user) {
      fetchRecentMessages()
      intervalId = setInterval(fetchRecentMessages, 30000)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [user])

  const getDefaultImage = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=6366f1&color=fff&size=32`
  }

  return (
    <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800">
      <h3 className="font-semibold text-slate-800 mb-4">Recent Messages</h3>
      <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            // Determine the "other" user for the chat link
            const isCurrentUserSender =
              message.from_user_id?._id === user.id ||
              message.from_user_id?.clerkId === user.id

            const otherUser = isCurrentUserSender
              ? message.to_user_id
              : message.from_user_id

            return (
              <Link
                to={`/messages/${otherUser?._id}`}
                key={index}
                className="flex items-start gap-2 py-2 px-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
              >
                <img
                  src={
                    otherUser?.profile_picture ||
                    getDefaultImage(otherUser?.full_name || 'User')
                  }
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  onError={(e) => {
                    e.target.src = getDefaultImage(
                      otherUser?.full_name || 'User'
                    )
                  }}
                />
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-slate-900 truncate">
                      {otherUser?.full_name || 'Unknown User'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {message.createdAt
                        ? moment(message.createdAt).fromNow()
                        : ''}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 truncate">
                      {message.text || 'Media'}
                    </p>
                    {message.seen === false &&
                      !isCurrentUserSender && ( // Only show unread if the other user sent it
                        <p className="bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] flex-shrink-0">
                          1
                        </p>
                      )}
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="text-center py-4 text-slate-500">
            <p>No recent messages</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentMessages
