'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions<T> {
  fetchFn: (page: number) => Promise<{ items: T[]; total: number }>;
  enabled?: boolean; // Only fetch when dropdown is open
}

interface UseInfiniteScrollResult<T> {
  items: T[];
  isLoading: boolean;
  hasMore: boolean;
  loaderRef: (node: HTMLDivElement | null) => void; // attach to sentinel div
  reset: () => void;
}

export function useInfiniteScroll<T>({
  fetchFn,
  enabled = true,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollResult<T> {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  // observerRef tracks the IntersectionObserver instance
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || !enabled) return;
    setIsLoading(true);
    try {
      const result = await fetchFn(page);
      setItems((prev) => [...prev, ...result.items]);
      setTotal(result.total);
      setHasMore(items.length + result.items.length < result.total);
      setPage((p) => p + 1);
    } catch (err) {
      console.error('Infinite scroll fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, enabled, fetchFn, items.length]);

  // Load first page when enabled
  useEffect(() => {
    if (enabled && items.length === 0 && !isLoading) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Callback ref: when the sentinel div enters viewport, load next page
  const loaderRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, loadMore],
  );

  const reset = useCallback(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
    setTotal(0);
  }, []);

  return { items, isLoading, hasMore, loaderRef, reset };
}
