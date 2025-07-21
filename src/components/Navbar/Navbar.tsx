import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Building2, Users2, TrendingUp, ScrollText, PhoneCall, ChevronDown } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container') && !mobileMenuRef.current?.contains(target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Properties', href: '#properties', icon: Building2, dropdown: [
        { name: 'Office', href: '/office', description: 'Commercial office spaces and business properties', image: '/office.jpg' },
        { name: 'Residential', href: '/residential', description: 'Luxury homes and residential developments', image: '/residential.jpg' }
    ]},
    { name: 'People', href: '#people', icon: Users2, dropdown: [
        { name: 'Directors', href: '/directors', description: 'Board of directors and leadership team', image: '/director.jpg' },
        { name: 'Executive Team', href: '/executive', description: 'Senior management and executives', image: '/executive.jpg' },
        { name: 'Management Team', href: '/management', description: 'Department heads and managers', image: '/management.jpg' }
    ]},
    { name: 'Financials', href: '#financials', icon: TrendingUp, dropdown: [
        { name: 'Financial Results 2024', href: '/financials-2024', description: 'Latest financial performance and annual report', image: '/2024.png' },
        { name: 'Financial Results 2023', href: '/financials-2023', description: 'Previous year financial performance', image: '/2023.png' },
        { name: 'Financial Results 2022', href: '/financials-2022', description: 'Historical financial data and analysis', image: '/2022.png' }
    ]},
    { name: 'Pensions', href: '/pensions', icon: ScrollText },
    { name: 'Contact Us', href: '/contact', icon: PhoneCall },
  ];
  
  const handleNavigation = (href: string, closeMobileMenu: boolean = true) => {
    const isSamePageScroll = href.startsWith('#') || (href === '/contact' && (window.location.pathname === '/' || window.location.pathname === '/index.html'));

    if (isSamePageScroll) {
      const targetId = href === '/contact' ? '#contact' : href;
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      document.documentElement.classList.add('is-navigating');
      setTimeout(() => {
        window.location.href = href.startsWith('#') ? `/${href}` : href;
      }, 300);
    }

    if (closeMobileMenu) {
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };

  const handleLogoClick = () => {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
       handleNavigation('/');
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
  };

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };
  
  useEffect(() => () => { if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current) }, []);
  useEffect(() => { document.documentElement.classList.remove('is-navigating') }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* --- LEFT COLUMN: LOGO --- */}
          <div className="flex-1 flex justify-start">
            <button onClick={handleLogoClick} className="transition-transform duration-300 hover:scale-105 active:scale-100">
              <img src="/Freshwater.png" alt="Highdorn Co. Limited" className="h-10 w-auto" />
            </button>
          </div>

          {/* --- CENTER COLUMN: DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.name} className="relative dropdown-container" onMouseLeave={() => item.dropdown && handleMouseLeave()}>
                  <button
                    onClick={() => item.dropdown ? toggleDropdown(item.name) : handleNavigation(item.href)}
                    onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 group hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                    {item.dropdown && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                  </button>

                  {item.dropdown && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50 animate-in fade-in zoom-in-95 duration-200"
                      onMouseEnter={handleDropdownMouseEnter}
                      style={{ width: item.dropdown.length === 2 ? '600px' : '900px' }}
                    >
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700 rotate-45"></div>
                      <div className={`grid ${item.dropdown.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                        {item.dropdown.map((dropdownItem) => (
                          <button key={dropdownItem.name} onClick={() => handleNavigation(dropdownItem.href)} className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 text-left">
                            <div className="aspect-video overflow-hidden"><img src={dropdownItem.image} alt={dropdownItem.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" /></div>
                            <div className="p-4">
                              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{dropdownItem.name}</h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{dropdownItem.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* CHANGE: Moved theme toggle to be part of the central nav items */}
              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: (EMPTY ON DESKTOP) & MOBILE CONTROLS --- */}
          <div className="flex-1 flex items-center justify-end">
            {/* Mobile controls remain here */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 rounded-md text-gray-700 dark:text-gray-300">
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-gray-700 dark:text-gray-300">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu (No changes needed here) */}
      {isOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => item.dropdown ? toggleDropdown(item.name) : handleNavigation(item.href)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center gap-2 w-full text-left"
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {item.dropdown && <ChevronDown className={`w-5 h-5 transition-transform duration-200 ml-auto ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                </button>

                {item.dropdown && activeDropdown === item.name && (
                  <div className="ml-6 mt-2 space-y-2 animate-in slide-in-from-top-2 duration-300">
                    {item.dropdown.map((dropdownItem) => (
                      <button key={dropdownItem.name} onClick={() => handleNavigation(dropdownItem.href)} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 w-full text-left active:bg-gray-200 dark:active:bg-gray-700 hover:scale-[1.02] active:scale-[0.98] transform">
                        <div className="w-16 h-12 flex-shrink-0 overflow-hidden rounded"><img src={dropdownItem.image} alt={dropdownItem.name} className="w-full h-full object-cover"/></div>
                        <div className="text-left flex-grow">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{dropdownItem.name}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{dropdownItem.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;