import React, {  useContext,useState } from 'react'
import Logo from './Logo'
import { TbShoppingBagSearch } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {

  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)


  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }
  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <header className='h-30 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center justify-between px-4' >
        <div className=''>
          <Link to={"/"}>
            <Logo w={100} h={80}/>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input type='text' placeholder='Search Items here...' className='w-full outline-none pl-2' onChange={handleSearch} value={search}/>
          <div className='text-xl min-w-[40px] h-8 bg-orange-400 text-white flex items-center justify-center rounded-r-full'>
            <TbShoppingBagSearch />
          </div>
        </div>
        
        <div className='flex justify-center gap-7'>
          <div className='relative group'>
          {
            user?._id && (
              <div className='text-3xl cursor-pointer -py-3 relative flex justify-center'onClick={()=>setMenuDisplay(preve => !preve)}>
                {
                  user?.profilePic ? (
                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                  ) : (
                      <FaUserCircle />
                  )
                }
              </div>
            )
          }
            
            {
              menuDisplay && (
                <div className='absolute bg-white -left-10 bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                      )
                    }
                   
                  </nav>
                </div>
              )
            }
          </div>
          
            {
              user?._id && (
                <Link to={"/cart"} className='text-3xl cursor-pointer relative'>
                  <span><FaCartShopping /></span>
                  <div className='bg-orange-400 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2'> 
                    <p className='text-sm'>{context?.cartProductCount}</p>
                  </div>
                </Link>
              )
            }
         
         <div>
                  {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-orange-400 hover:bg-orange-500'>Logout</button>
                    )
                    : (
                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-orange-400 hover:bg-orange-500'>Login</Link>
                    )
                  }
                    
                </div>
        </div>
      </div>
    </header>
  )
}

export default Header
