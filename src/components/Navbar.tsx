import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Bell, User, Calendar, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from '@/utils/data';
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, logout } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New featured service: Premium Photography", isNew: true },
    { id: 2, title: "Special discount on Wedding Venues", isNew: true },
    { id: 3, title: "New Caterers in your area", isNew: false }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching for services",
        description: `Finding results for "${searchQuery}"`,
      });
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isNew: false } 
        : notification
    ));

    toast({
      title: "Notification opened",
      description: "You've opened a notification",
    });
  };

  const unreadCount = notifications.filter(n => n.isNew).length;
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md",
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-md" 
        : "bg-white/90"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/63f210e0-ede7-488f-89f1-3c588fe63c17.png" 
                alt="LetsEventify Logo" 
                className="h-10"
              />
              <span className="font-syne font-bold text-lg hidden sm:inline-block text-gray-800">
                LetsEventify
              </span>
            </Link>
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-pink-600 transition-colors px-4 py-2 font-medium"
                >
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="bg-transparent hover:bg-pink-50 hover:text-pink-600 text-gray-700 font-medium"
                >
                  Explore
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-pink-500 to-pink-600 p-6 no-underline outline-none focus:shadow-md"
                          href="/categories/wedding"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            Wedding Services
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Discover premium wedding services for your special day
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {categories.slice(0, 3).map(category => (
                      <li key={category.id}>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-pink-50 transition-colors"
                            href={`/category/${category.id}`}
                          >
                            <div className="text-sm font-medium leading-none">{category.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/categories" 
                  className="text-gray-700 hover:text-pink-600 transition-colors px-4 py-2 font-medium"
                >
                  Categories
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-pink-600 transition-colors px-4 py-2 font-medium"
                >
                  About
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex items-center space-x-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                >
                  <Search size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <form onSubmit={handleSearch} className="flex">
                  <Input 
                    placeholder="Search for services..." 
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" variant="ghost" size="icon">
                    <Search size={20} />
                  </Button>
                </form>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                >
                  <Calendar size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-2">
                  <h3 className="font-medium">Select Event Date</h3>
                  <p className="text-sm text-muted-foreground">Choose your event date to find available services</p>
                  <div className="pt-2">
                    <Input type="date" className="w-full" />
                  </div>
                  <Button 
                    className="w-full mt-2 bg-pink-500 hover:bg-pink-600"
                    onClick={() => {
                      toast({
                        title: "Date selected",
                        description: "Showing services available on this date",
                      });
                    }}
                  >
                    Find Services
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] text-white">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-2">
                  <span className="font-medium">Notifications</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, isNew: false })))}
                  >
                    Mark all as read
                  </Button>
                </div>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id}
                      className={cn(
                        "p-3 cursor-pointer",
                        notification.isNew && "bg-pink-50"
                      )}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-start gap-2">
                        {notification.isNew && (
                          <span className="h-2 w-2 mt-1.5 rounded-full bg-pink-500" />
                        )}
                        <div>
                          <p className={cn(
                            "text-sm",
                            notification.isNew && "font-medium"
                          )}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Just now</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No notifications yet
                  </div>
                )}
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              >
                <LogOut size={20} />
              </Button>
            )}

            <Button 
              variant="outline" 
              className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
            >
              <Link to="/login" className="w-full">Log in</Link>
            </Button>
            <Button 
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Link to="/signup" className="w-full">Sign up</Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <Search size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-screen p-0 left-0 right-0" align="center">
                <form onSubmit={handleSearch} className="flex">
                  <Input 
                    placeholder="Search for services..." 
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" variant="ghost" size="icon">
                    <Search size={20} />
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pink-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-pink-50 hover:text-pink-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="relative">
              <button
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-pink-50 hover:text-pink-600"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/categories');
                  setIsMenuOpen(false);
                }}
              >
                Categories
                <ChevronDown className="ml-auto h-4 w-4" />
              </button>
            </div>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-pink-50 hover:text-pink-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="px-3 py-2">
              <p className="text-sm font-medium mb-1">Select Event Date</p>
              <Input 
                type="date" 
                className="w-full" 
                onChange={() => {
                  toast({
                    title: "Date selected",
                    description: "Showing services available on this date",
                  });
                }}
              />
            </div>
            
            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Notifications</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-6 px-2"
                  onClick={() => setNotifications(notifications.map(n => ({ ...n, isNew: false })))}
                >
                  Mark all read
                </Button>
              </div>
              <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "p-2 rounded-md text-sm",
                      notification.isNew ? "bg-pink-50" : "bg-gray-50"
                    )}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    {notification.title}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outline" className="w-full border-pink-600 text-pink-600" onClick={() => setIsMenuOpen(false)}>
                <Link to="/login" className="w-full">Log in</Link>
              </Button>
              <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={() => setIsMenuOpen(false)}>
                <Link to="/signup" className="w-full">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
