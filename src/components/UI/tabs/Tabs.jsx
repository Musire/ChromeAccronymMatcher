import clsx from 'clsx';
import { useState, createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';

// Create Context
const TabsContext = createContext();

const Tabs = ({ children, className, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={twMerge('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabList({ children, className }) {
  return (
    <div className={twMerge('flex', className)}>
      {children}
    </div>
  );
};

Tabs.Trigger = function TabTrigger({ value, className, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      type='button'
      onClick={() => setActiveTab(value)}
      className={twMerge(clsx('capitalize border px-4 py-2 text-sm font-medium  transition-all  -mb-2 flex-1',
        activeTab === value
          ? 'surface-2   border-adjust text-main dark:bg-blue-400/30 '
          : 'border-transparent  dark:hover:surface-4 hover:bg-mid/30 hover:text-else  '
       ), className)}

    >
      {children}
    </button>
  );
};

Tabs.Content = function TabContent({ value, className, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return (
    <div className={twMerge('w-full h-full p-6', className)}>
      {children}
    </div>
  );
};

export default Tabs