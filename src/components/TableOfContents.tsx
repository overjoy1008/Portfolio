"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface ToCItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents: React.FC = () => {
  const pathname = usePathname() ?? "";
  const { language } = useLanguage();
  const [items, setItems] = useState<ToCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const isProjectDetail = pathname.startsWith('/portfolio/');

  useEffect(() => {
    const findItems = () => {
      let elements: HTMLElement[] = [];
      if (isProjectDetail) {
        // Find h1, h2, h3 in project detail
        const headings = Array.from(document.querySelectorAll('h1[id], h2[id], h3[id]')) as HTMLElement[];
        elements = headings;
      } else if (pathname === '/') {
        // Find sections in home page and get their h3 titles
        const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
        const sectionItems = sections.map(section => {
          const titleEl = section.querySelector('h3');
          return {
            id: section.id,
            text: titleEl ? titleEl.innerText.replace(/\.$/, '') : section.id,
            level: 2
          };
        });
        setItems([
          { id: 'top', text: 'About Me', level: 2 },
          ...sectionItems,
        ]);
        return;
      }

      const newItems = elements.map(el => ({
        id: el.id,
        text: el.innerText.replace(/\.$/, ''), // Remove trailing dot if exists
        level: isProjectDetail ? parseInt(el.tagName.substring(1)) : 2
      }));

      setItems(newItems);
    };

    // Small delay to ensure DOM is rendered
    const timer = setTimeout(findItems, 500);
    return () => clearTimeout(timer);
  }, [pathname, isProjectDetail, language]);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0% -70% 0%', threshold: 0 }
    );

    items.forEach((item) => {
      if (item.id === 'top') return;
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveId('top');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Header height + some padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-6 top-24 hidden min-[1431px]:flex flex-col gap-3 w-48 z-40"
    >
      <div className="flex flex-col gap-1 border-l border-neutral-100 pl-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`
              font-noto text-xs transition-all duration-300 hover:text-neutral-900
              ${item.level === 3 ? 'pl-4' : ''}
              ${activeId === item.id 
                ? 'text-neutral-900 font-bold translate-x-1' 
                : 'text-neutral-400 font-medium'}
            `}
          >
            {item.text}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};
