'use client'
import { useState, useEffect, useContext } from 'react'
// import Style from '@/app/styles/dashboard.module.css'
import Image from 'next/image'
import Link from 'next/link';
import { useAppContext } from '../../../context/appContext';
import Navbar from '../../../components/Navbar';
import { User } from '../../../utility/user';



export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [activeMenu, setActiveMenu] = useState('analysis');
    const [isClient, setIsClient] = useState(false);

    const [startDate, setStartDate] = useState('2024-04-01');
    const [endDate, setEndDate] = useState('2024-12-31');

    const handleClick = (componentName:string) => {
        setActiveMenu(componentName);
    };
    const {serverIp, isLogin} = useAppContext();

    const [UserData, setUserData] = useState<User>();
    // const fontColor = (theme === "system") ? userTheme() === 'dark' ? "#1C1C1C" : "#000" : (theme === 'dark') ? "#1C1C1C" : "#000";
    // const backColor = (theme === "system") ? userTheme() === 'dark' ? "#AAAAAA" : "#C9C9C9" : (theme === 'dark') ? "#AAAAAA" : "#C9C9C9";
    const navMenus = [
        { title: 'Add Product', name: 'addproduct', link: '/dashboard/addproduct' },
        { title: 'Analysis', name: 'analysis', link: `/dashboard/analysis?startdate=${startDate}&enddate=${endDate}` },
        // { title: 'Chart', name: 'chart', link: '/dashboard/chart' },
        // { title: 'Stats', name: 'stats', link: '/dashboard/stats' },
        { title: 'Transection History', name: 'transection', link: '/dashboard/transection?startdate=2024-01-01&enddate=2024-12-31' },
        { title: 'Available Product', name: 'available', link: '/dashboard/availableproduct' },
        { title: 'User', name: 'user', link: '/user' },
    ];
    useEffect(() => {
        setIsClient(true);
    }, [])

    useEffect(() => {
        if (isClient) {

            const pathname = window.location.pathname;
            const menu = getMenuFromPathname(pathname); // Implement this function to extract the menu name from the pathname
            setActiveMenu(menu);

            // Listen for popstate (back/forward navigation) to update active menu
            const handlePopstate = () => {
                const newPathname = window.location.pathname;
                const newMenu = getMenuFromPathname(newPathname);
                setActiveMenu(newMenu);
            };
            window.addEventListener('popstate', handlePopstate);

            return () => {
                window.removeEventListener('popstate', handlePopstate);
            };
        }
    }, [isClient])

    // Function to extract menu name from the pathname
    const getMenuFromPathname = (pathname:string) => {
        // Implement your logic here to extract the menu name from the pathname
        // For example, if your URL is '/dashboard/transection', extract 'transection' from it
        const parts = pathname.split('/');
        const menuName = parts[parts.length - 1];
        // You might need to handle special cases like '/dashboard/' or '/dashboard' to set 'analysis' as default
        return ((menuName === 'dashboard') ? 'analysis' : menuName); // Return 'analysis' as default if dashboard name found
    };

    const getUser = async ()=>{
        const response = await fetch(`${serverIp}/api/auth/getuser`, {
            method: 'GET',
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
            }
          });
        setUserData(await response.json());
    

    }

    useEffect(()=>{
        getUser();
    },[])

    // const userData =localStorage.getItem('user');

    // const jsonData = JSON.parse(userData);

    // console.log("User Data Layout", userData);  
    return (
        < >

        <Navbar/>
        <div className="w-full min-h-screen h-full bg-slate-200 flex p-3">
            {/* Include shared UI here e.g. a header or sidebar */}
            {/* Dashboard navmenu bar Start */}
            <div className='w-2/12'>
                {/* <div className={Style.dashBar}>
                <Image className={Style.userImage} src='/person.jpg' width={100} height={100} alt="" priority/>
            </div> */}
                <Image className="rounded-full border-b-2 border-white" src='/assets/person.jpg' width={100} height={100} alt="" priority />
                <h2>{UserData?.user?.name}</h2>
                <h3>{UserData?.user?.address}</h3>
                <div className="w-full h-">
                    <div className="w-full">
                        {navMenus.map((item, index) => (
                            <Link href={item.link} key={index}><span className="w-full" onClick={() => handleClick(item.name)}><p className={activeMenu === item.name ? `bg-slate-400 hover:bg-slate-500 duration-500 hover:text-white px-1 py-1 my-1` : "my-1 px-1 py-1 hover:bg-slate-500 hover:text-white duration-500 "}>{item.title}</p></span> </Link>
                        ))}
                    </div>
                </div>
            </div>
            {/* Dashboard navmenubar end */}


            {children}
        </div>
        </>
                     
    )
}