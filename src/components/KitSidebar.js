import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { KIT_CATEGORIES, KIT_TOOLS, KIT_CATEGORY_ORDER } from '../data/kit-tools';

const CategoryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CategoryItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.gray};
  background: ${({ $active, theme }) =>
    $active ? `${theme.colors.primary}15` : 'transparent'};
  font-size: 0.82rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  transition: background 0.2s, color 0.2s;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
    color: ${({ theme }) => theme.colors.headline};
  }
`;

const CatEmoji = styled.span`
  font-size: 1rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
`;

const CatLabel = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CatCount = styled.span`
  font-size: 0.7rem;
  padding: 1px 7px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.glassBorder};
  color: ${({ theme }) => theme.colors.gray};
`;

const KitSidebar = ({ activeCategory }) => {
  const grouped = {};
  for (const tool of KIT_TOOLS) {
    if (!grouped[tool.category]) grouped[tool.category] = 0;
    grouped[tool.category]++;
  }

  return (
    <CategoryList>
      {KIT_CATEGORY_ORDER.filter(c => grouped[c]).map(cat => {
        const { emoji, label } = KIT_CATEGORIES[cat];
        return (
          <li key={cat}>
            <CategoryItem
              to={`/kit/#${cat}`}
              $active={activeCategory === cat}
              onClick={() => {
                const el = document.getElementById(cat);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <CatEmoji>{emoji}</CatEmoji>
              <CatLabel>{label}</CatLabel>
              <CatCount>{grouped[cat]}</CatCount>
            </CategoryItem>
          </li>
        );
      })}
    </CategoryList>
  );
};

export default KitSidebar;
