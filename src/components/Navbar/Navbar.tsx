import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Building2, Users2, TrendingUp, ScrollText, PhoneCall, ChevronDown } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        { name: 'Directors', href: '/directors', description: 'Board of directors and leadership team', image: '/executive.jpg' },
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
      // Direct navigation without transitions
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

  // Determine if navbar should be colored (scrolled or hovered)
  const isNavbarColored = isScrolled || isHovered;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isNavbarColored 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* --- LEFT COLUMN: LOGO --- */}
          <div className="flex-shrink-0">
            <button onClick={handleLogoClick} className="transition-transform duration-300 hover:scale-105 active:scale-100">
              <img 
                src="/Freshwater.png" 
                alt="Highdorn Co. Limited" 
                className={`h-10 w-auto transition-all duration-500 ${
                  isNavbarColored ? 'opacity-100' : 'opacity-90 brightness-110'
                }`} 
              />
            </button>
          </div>

          {/* --- CENTER COLUMN: DESKTOP NAVIGATION --- */}
          <div className="hidden xl:flex items-center justify-center flex-1">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.name} className="relative dropdown-container" onMouseLeave={() => item.dropdown && handleMouseLeave()}>
                  <button
                    onClick={() => item.dropdown ? toggleDropdown(item.name) : handleNavigation(item.href)}
                    onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 group ${
                      isNavbarColored 
                        ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800' 
                        : 'text-white hover:text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                    {item.dropdown && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                  </button>

                  {item.dropdown && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-1/2 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50 opacity-0 scale-95 animate-dropdown-in"
                      onMouseEnter={handleDropdownMouseEnter}
                      style={{ 
                        width: item.dropdown.length === 2 ? '600px' : '900px',
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className={`grid ${item.dropdown.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                        {item.dropdown.map((dropdownItem) => (
                          <button key={dropdownItem.name} onClick={() => handleNavigation(dropdownItem.href)} className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-out border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 text-left transform hover:scale-105 hover:-translate-y-1">
                            <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                              <img 
                                src={dropdownItem.image} 
                                alt={dropdownItem.name} 
                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300 ease-out" 
                                loading="lazy"
                                decoding="async"
                                style={{ 
                                  imageRendering: 'auto',
                                  filter: 'blur(0px)',
                                  transition: 'filter 0.3s ease'
                                }}
                                onLoad={(e) => {
                                  const img = e.target as HTMLImageElement;
                                  img.style.filter = 'blur(0px)';
                                }}
                                onError={(e) => {
                                  const img = e.target as HTMLImageElement;
                                  img.style.display = 'none';
                                }}
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 ease-out">{dropdownItem.name}</h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200 ease-out">{dropdownItem.description}</p>
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
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isNavbarColored 
                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800' 
                    : 'text-white hover:text-blue-200 hover:bg-white/10'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: (EMPTY ON DESKTOP) & MOBILE CONTROLS --- */}
          <div className="flex items-center justify-end">
            {/* Mobile controls remain here */}
            <div className="xl:hidden flex items-center gap-2">
              <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-md transition-colors duration-300 ${
                  isNavbarColored 
                    ? 'text-gray-700 dark:text-gray-300' 
                    : 'text-white'
                }`}
              >
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`p-2 rounded-md transition-all duration-300 relative overflow-hidden ${
                  isNavbarColored 
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' 
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  {/* Hamburger lines */}
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

      {/* Mobile Menu (No changes needed here) */}
      {isOpen && (
        <div 
          ref={mobileMenuRef} 
          className={`xl:hidden backdrop-blur-lg max-h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-400 ease-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          } ${
            isNavbarColored 
              ? 'bg-white/95 dark:bg-gray-900/95' 
              : 'bg-white/90 dark:bg-gray-900/90'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <div key={item.name} className="animate-in slide-in-from-left duration-300 ease-out" style={{ animationDelay: `${index * 50}ms` }}>
                <button
                  onClick={() => item.dropdown ? toggleDropdown(item.name) : handleNavigation(item.href)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-out flex items-center gap-2 w-full text-left active:scale-95 hover:translate-x-1 ${
                    isNavbarColored 
                      ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800' 
                      : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {item.dropdown && <ChevronDown className={`w-5 h-5 transition-transform duration-400 ease-out ml-auto ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                </button>

                {item.dropdown && activeDropdown === item.name && (
                  <div className={`ml-6 mt-2 space-y-2 transition-all duration-400 ease-out ${
                    activeDropdown === item.name ? 'opacity-100 translate-y-0 max-h-96' : 'opacity-0 -translate-y-2 max-h-0 overflow-hidden'
                  }`}>
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <button
                        key={dropdownItem.name} 
                        onClick={() => handleNavigation(dropdownItem.href)} 
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-out w-full text-left active:bg-gray-200 dark:active:bg-gray-700 hover:scale-[1.02] active:scale-[0.98] transform hover:shadow-md hover:translate-x-1 animate-in slide-in-from-left"
                        style={{ animationDelay: `${dropdownIndex * 75}ms` }}
                      >
                        <div className="w-16 h-12 flex-shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-gray-700">
                          <img 
                            src={dropdownItem.image} 
                            alt={dropdownItem.name} 
                            className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110" 
                            loading="lazy"
                            decoding="async"
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