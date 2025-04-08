
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Search, Bell, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-md" 
        : "bg-transparent"
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
              <span className="font-syne font-bold text-lg hidden sm:inline-block text-pink-500">
                LetsEventify
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="text-foreground hover:text-pink-500 transition-colors px-4 py-2">
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-pink-50 hover:text-pink-500">
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
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-pink-50 transition-colors"
                          href="/categories/photography"
                        >
                          <div className="text-sm font-medium leading-none">Photography</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Professional photographers for all occasions
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-pink-50 transition-colors"
                          href="/categories/catering"
                        >
                          <div className="text-sm font-medium leading-none">Catering</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Delicious food services for any event
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-pink-50 transition-colors"
                          href="/categories/decoration"
                        >
                          <div className="text-sm font-medium leading-none">Decoration</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Creative decoration services for all events
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/categories" className="text-foreground hover:text-pink-500 transition-colors px-4 py-2">
                  Categories
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className="text-foreground hover:text-pink-500 transition-colors px-4 py-2">
                  About
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-foreground hover:text-pink-500 transition-colors">
              <Search size={20} />
            </button>
            <button className="text-foreground hover:text-pink-500 transition-colors">
              <Bell size={20} />
            </button>
            <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white">
              Log in
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              Sign up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button className="text-foreground hover:text-pink-500 transition-colors">
              <Search size={20} />
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-pink-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-pink-50 hover:text-pink-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-pink-50 hover:text-pink-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-pink-50 hover:text-pink-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-pink-50 hover:text-pink-500"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outline" className="w-full border-pink-500 text-pink-500">
                Log in
              </Button>
              <Button className="w-full bg-pink-500 hover:bg-pink-600">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
