import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Building2, Users2, TrendingUp, ScrollText, PhoneCall, ChevronDown, ChevronRight } from 'lucide-react';
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
    { 
      name: 'Properties', 
      href: '#properties', 
      icon: Building2, 
      color: 'blue',
      dropdown: [
        { name: 'Office', href: '/office', description: 'Commercial office spaces and business properties', image: '/office.jpg' },
        { name: 'Residential', href: '/residential', description: 'Luxury homes and residential developments', image: '/residential.jpg' }
      ]
    },
    { 
      name: 'People', 
      href: '#people', 
      icon: Users2, 
      color: 'green',
      dropdown: [
        { name: 'Directors', href: '/directors', description: 'Board of directors and leadership team', image: '/executive.jpg' },
        { name: 'Executive Team', href: '/executive', description: 'Senior management and executives', image: '/executive.jpg' },
        { name: 'Management Team', href: '/management', description: 'Department heads and managers', image: '/management.jpg' }
      ]
    },
    { 
      name: 'Financials', 
      href: '#financials', 
      icon: TrendingUp, 
      color: 'purple',
      dropdown: [
        { name: 'Financial Results 2024', href: '/financials-2024', description: 'Latest financial performance and annual report', image: '/2024.png' },
        { name: 'Financial Results 2023', href: '/financials-2023', description: 'Previous year financial performance', image: '/2023.png' },
        { name: 'Financial Results 2022', href: '/financials-2022', description: 'Historical financial data and analysis', image: '/2022.png' }
      ]
    },
    { name: 'Pensions', href: '/pensions', icon: ScrollText },
    { name: 'Contact Us', href: '/contact', icon: PhoneCall },
  ];

  const getDropdownColors = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-700',
          accent: 'text-blue-600 dark:text-blue-400',
          hover: 'hover:bg-blue-100 dark:hover:bg-blue-800/30'
        };
      case 'green':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-700',
          accent: 'text-green-600 dark:text-green-400',
          hover: 'hover:bg-green-100 dark:hover:bg-green-800/30'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          border: 'border-purple-200 dark:border-purple-700',
          accent: 'text-purple-600 dark:text-purple-400',
          hover: 'hover:bg-purple-100 dark:hover:bg-purple-800/30'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800',
          border: 'border-gray-200 dark:border-gray-700',
          accent: 'text-gray-600 dark:text-gray-400',
          hover: 'hover:bg-gray-100 dark:hover:bg-gray-700'
        };
    }
  };
  
  const handleNavigation = (href: string, closeMobileMenu: boolean = true) => {
    const isSamePageScroll = href.startsWith('#') || (href === '/contact' && (window.location.pathname === '/' || window.location.pathname === '/index.html'));

    if (isSamePageScroll) {
      const targetId = href === '/contact' ? '#contact' : href;
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href.startsWith('#') ? `/${href}` : href;
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={handleLogoClick} className="transition-transform duration-300 hover:scale-105 active:scale-100">
              <img src="/Freshwater.png" alt="Highdorn Co. Limited" className="h-10 w-auto" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center justify-center flex-1">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative dropdown-container" onMouseLeave={() => item.dropdown && handleMouseLeave()}>
                  <button
                    onClick={() => item.dropdown ? toggleDropdown(item.name) : handleNavigation(item.href)}
                    onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                    className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 group hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      activeDropdown === item.name ? 'bg-gray-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                    {item.dropdown && <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                  </button>

                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 right-0 z-50">
                      <div className="flex">
                        {/* Left Sidebar */}
                        <div className={`w-80 ${getDropdownColors(item.color || 'gray').bg} ${getDropdownColors(item.color || 'gray').border} border-r p-6`}>
                          <div className="flex items-center gap-2 mb-6">
                            <item.icon className={`w-5 h-5 ${getDropdownColors(item.color || 'gray').accent}`} />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                              {item.name}
                            </h3>
                            <ChevronRight className={`w-4 h-4 ${getDropdownColors(item.color || 'gray').accent} ml-auto`} />
                          </div>
                          <div className="space-y-2">
                            {item.dropdown.map((dropdownItem) => (
                              <button
                                key={dropdownItem.name}
                                onClick={() => handleNavigation(dropdownItem.href)}
                                className={`block w-full text-left px-3 py-2 text-sm font-medium ${getDropdownColors(item.color || 'gray').accent} ${getDropdownColors(item.color || 'gray').hover} transition-colors duration-200`}
                              >
                                {dropdownItem.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Content Area */}
                        <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-6">
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                            FEATURED IN {item.name.toUpperCase()}
                          </h4>
                          <div className={`grid ${item.dropdown.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                            {item.dropdown.map((dropdownItem) => (
                              <button
                                key={dropdownItem.name}
                                onClick={() => handleNavigation(dropdownItem.href)}
                                className="group bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-all duration-300 text-left border border-gray-200 dark:border-gray-700"
                              >
                                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                                  <img 
                                    src={dropdownItem.image} 
                                    alt={dropdownItem.name} 
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                                    loading="lazy"
                                    onError={(e) => {
                                      const img = e.target as HTMLImageElement;
                                      img.style.display = 'none';
                                    }}
                                  />
                                </div>
                                <div className="p-4">
                                  <h5 className={`font-semibold ${getDropdownColors(item.color || 'gray').accent} group-hover:underline transition-colors duration-200 mb-1`}>
                                    {dropdownItem.name}
                                  </h5>
                                  <ChevronRight className={`w-4 h-4 ${getDropdownColors(item.color || 'gray').accent}`} />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDarkMode ? "Light" : "Dark"}
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center justify-end">
            <div className="xl:hidden flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 text-gray-700 dark:text-gray-300">
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 text-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative overflow-hidden"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'
                  }`}></span>
                  <span className={`absolute left-0 top-2.5 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}></span>
                  <span className={`absolute left-0 top-4 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          ref={mobileMenuRef} 
          className="xl:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg max-h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-400 ease-out border-t border-gray-200 dark:border-gray-700"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <div key={item.name} className="animate-in slide-in-from-left duration-300 ease-out" style={{ animationDelay: `${index * 50}ms` }}>
                <button
                  onClick={() => item.dropdown ? toggleDropdown(item.name) : handleNavigation(item.href)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 text-base font-medium transition-all duration-300 ease-out flex items-center gap-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 hover:translate-x-1"
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {item.dropdown && <ChevronDown className={`w-5 h-5 transition-transform duration-400 ease-out ml-auto ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                </button>

                {item.dropdown && activeDropdown === item.name && (
                  <div className="ml-6 mt-2 space-y-2 transition-all duration-400 ease-out">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <button
                        key={dropdownItem.name} 
                        onClick={() => handleNavigation(dropdownItem.href)} 
                        className="flex items-start gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-out w-full text-left active:bg-gray-200 dark:active:bg-gray-700 hover:scale-[1.02] active:scale-[0.98] transform hover:shadow-md hover:translate-x-1 animate-in slide-in-from-left border border-gray-200 dark:border-gray-700"
                        style={{ animationDelay: `${dropdownIndex * 75}ms` }}
                      >
                        <div className="w-16 h-12 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-700">
                          <img 
                            src={dropdownItem.image} 
                            alt={dropdownItem.name} 
                            className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110" 
                            loading="lazy"
                            onError={(e) => {
                              const img = e.target as HTMLImageElement;
                              img.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="text-left flex-grow">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{dropdownItem.name}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 transition-colors duration-200">{dropdownItem.description}</p>
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