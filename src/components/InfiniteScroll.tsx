
import React, { useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  loadingComponent?: React.ReactNode;
  children: React.ReactNode;
}

const InfiniteScroll = ({
  onLoadMore,
  hasMore,
  isLoading,
  loadingComponent,
  children
}: InfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading && !isFetching) {
          setIsFetching(true);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, isLoading, isFetching]);

  useEffect(() => {
    if (isFetching && hasMore) {
      onLoadMore();
      setIsFetching(false);
    }
  }, [isFetching, hasMore, onLoadMore]);

  return (
    <div className="relative w-full">
      {children}
      <div ref={loadMoreRef} className="h-10" />
      {isLoading && loadingComponent}
    </div>
  );
};

export default InfiniteScroll;
