// src/components/form/ProductDropdown.tsx
// Single-select dropdown with infinite scroll for the Experience Level field.
// Fetches from https://dummyjson.com/products
//
// Each item displays: thumbnail image + title + category + price
// Loads more items as user scrolls to bottom of list (IntersectionObserver).

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import Image from 'next/image';
import type { Product } from '@/types';
import { fetchProducts } from '@/services/api';
import { dropdownStyles as styles } from '@/styles/formStyles';

const PAGE_SIZE = 10;

interface ProductDropdownProps {
  value: Product | null;
  onChange: (product: Product | null) => void;
  error?: string;
}

export function ProductDropdown({ value, onChange, error }: ProductDropdownProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Load a page of products
  const loadMore = useCallback(async (currentPage: number, currentItems: Product[]) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = await fetchProducts(currentPage);
      const newItems = [...currentItems, ...data.products];
      setItems(newItems);
      setTotal(data.total);
      setHasMore(newItems.length < data.total);
      setPage(currentPage + 1);
    } catch (e) {
      console.error('ProductDropdown fetch error:', e);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Initial load when dropdown opens
  useEffect(() => {
    if (open && items.length === 0) {
      loadMore(0, []);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // IntersectionObserver on sentinel div at bottom of list
  useEffect(() => {
    if (!open || !sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore(page, items);
        }
      },
      { root: listRef.current, threshold: 0.1 },
    );

    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, hasMore, isLoading, page, items]);

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <Box ref={containerRef} sx={{ position: 'relative' }}>
      {/* Trigger button */}
      <Box
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((o) => !o)}
        sx={styles.trigger(open)}
      >
        {value ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
            <Image
              src={value.thumbnail}
              alt={value.title}
              width={32}
              height={32}
              style={{ borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="body2"
                fontWeight={600}
                noWrap
                sx={{ color: 'text.primary' }}
              >
                {value.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {value.category} · ${value.price}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography sx={styles.placeholder}>Select experience level...</Typography>
        )}
        <KeyboardArrowDownIcon
          sx={{
            color: 'text.secondary',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
        />
      </Box>

      {/* Dropdown list */}
      {open && (
        <Box ref={listRef} sx={styles.paper}>
          {items.map((product) => {
            const selected = value?.id === product.id;
            return (
              <Box
                key={product.id}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(selected ? null : product);
                  setOpen(false);
                }}
                sx={styles.item(selected)}
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={40}
                  height={40}
                  style={{ borderRadius: 6, objectFit: 'cover', flexShrink: 0 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {product.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" noWrap>
                    {product.category}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                  <Chip label={`$${product.price}`} size="small" color="primary" variant="outlined" />
                  {selected && <CheckIcon sx={{ color: 'primary.main' }} fontSize="small" />}
                </Box>
              </Box>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <Box sx={styles.loader}>
              <CircularProgress size={24} />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                Loading...
              </Typography>
            </Box>
          )}

          {/* Sentinel div — triggers IntersectionObserver */}
          <div ref={sentinelRef} style={{ height: 1 }} />

          {!hasMore && items.length > 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', textAlign: 'center', py: 1 }}
            >
              All {total} items loaded
            </Typography>
          )}
        </Box>
      )}

      {error && (
        <FormHelperText error sx={{ mt: 0.5, ml: 1.5 }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
}
