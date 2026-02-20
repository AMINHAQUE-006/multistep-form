'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { DummyUser } from '@/types';
import { fetchUsers } from '@/services/api';
import { dropdownStyles as styles } from '@/styles/formStyles';

interface UserMultiDropdownProps {
  value: DummyUser[];
  onChange: (users: DummyUser[]) => void;
  error?: string;
}

export function UserMultiDropdown({ value, onChange, error }: UserMultiDropdownProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<DummyUser[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMore = useCallback(async (currentPage: number, currentItems: DummyUser[]) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = await fetchUsers(currentPage);
      const newItems = [...currentItems, ...data.users];
      setItems(newItems);
      setTotal(data.total);
      setHasMore(newItems.length < data.total);
      setPage(currentPage + 1);
    } catch (e) {
      console.error('UserMultiDropdown fetch error:', e);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (open && items.length === 0) {
      loadMore(0, []);
    }
  }, [open]);

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
  }, [open, hasMore, isLoading, page, items]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const toggleUser = (user: DummyUser) => {
    const exists = value.find((u) => u.id === user.id);
    if (exists) {
      onChange(value.filter((u) => u.id !== user.id));
    } else {
      onChange([...value, user]);
    }
  };

  const removeUser = (userId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((u) => u.id !== userId));
  };

  return (
    <Box ref={containerRef} sx={{ position: 'relative' }}>
      {/* Trigger */}
      <Box
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-multiselectable="true"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((o) => !o)}
        sx={{ ...styles.trigger(open), flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}
      >
        {value.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, flex: 1 }}>
            {value.map((user) => (
              <Chip
                key={user.id}
                size="small"
                avatar={<Avatar src={user.image} sx={{ width: 20, height: 20 }} />}
                label={`${user.firstName} ${user.lastName}`}
                onDelete={(e) => removeUser(user.id, e as React.MouseEvent)}
                sx={{ maxWidth: 180 }}
              />
            ))}
          </Box>
        ) : (
          <Typography sx={styles.placeholder}>Select preferred departments...</Typography>
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
          {items.map((user) => {
            const selected = Boolean(value.find((u) => u.id === user.id));
            return (
              <Box
                key={user.id}
                role="option"
                aria-selected={selected}
                onClick={() => toggleUser(user)}
                sx={styles.item(selected)}
              >
                <Avatar src={user.image} sx={{ width: 40, height: 40, flexShrink: 0 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" noWrap>
                    {user.company.name}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" noWrap>
                    {user.email}
                  </Typography>
                </Box>
                {selected && <CheckIcon sx={{ color: 'primary.main', flexShrink: 0 }} fontSize="small" />}
              </Box>
            );
          })}

          {isLoading && (
            <Box sx={styles.loader}>
              <CircularProgress size={24} />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                Loading...
              </Typography>
            </Box>
          )}

          <div ref={sentinelRef} style={{ height: 1 }} />

          {!hasMore && items.length > 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', textAlign: 'center', py: 1 }}
            >
              All {total} users loaded
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
