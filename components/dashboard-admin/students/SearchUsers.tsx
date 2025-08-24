"use client";
import React, { FormEvent, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchOutlined, ClearOutlined } from "@mui/icons-material";

const SearchUsers = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const [searchData, setSearchData] = useState<string>(filter);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setIsLoading(true);
      const params = new URLSearchParams();

      if (searchTerm.trim()) {
        params.set("filter", searchTerm.trim());
      }

      router.push(`?${params.toString()}`);
      setTimeout(() => setIsLoading(false), 300);
    }, 500),
    [router]
  );

  useEffect(() => {
    debouncedSearch(searchData);
  }, [searchData, debouncedSearch]);

  const handleClearSearch = () => {
    setSearchData("");
    router.push(window.location.pathname);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedSearch.cancel();

    const params = new URLSearchParams();
    if (searchData.trim()) {
      params.set("filter", searchData.trim());
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-lg ">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          {/* Search Icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none z-10">
            <div
              className={`transition-all duration-200 ${
                isFocused ? "scale-110 text-blue-600" : "text-gray-400"
              }`}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
              ) : (
                <SearchOutlined className="w-5 h-5" />
              )}
            </div>
          </div>

          {/* Input Field */}
          <input
            type="text"
            id="search-users"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="ابحث..."
            className={`
              apply-fonts-normal w-full px-12 py-3.5 
              bg-white border-2 rounded-xl
              text-gray-800 placeholder-gray-400
              transition-all duration-300 ease-in-out
              focus:outline-none focus:ring-0
              shadow-sm hover:shadow-md
              ${
                isFocused
                  ? "border-blue-500 shadow-lg ring-4 ring-blue-100 bg-blue-50/30"
                  : "border-gray-200 hover:border-gray-300"
              }
              ${searchData ? "pr-20" : "pr-12"}
            `}
            dir="rtl"
          />

          {/* Clear Button */}
          {searchData && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 hover:text-red-500 transition-colors duration-200 z-10"
              title="مسح البحث"
            >
              <ClearOutlined className="w-5 h-5" />
            </button>
          )}

          {/* Search Button (Mobile) */}
          <button
            type="submit"
            className="md:hidden absolute inset-y-0 left-0 flex items-center pl-3 bg-blue-600 text-white rounded-l-xl hover:bg-blue-700 transition-colors duration-200"
            title="بحث"
          >
            <SearchOutlined className="w-5 h-5" />
          </button>
        </div>

        {/* Search Stats */}
        {filter && (
          <div className="mt-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="apply-fonts-normal">
                البحث عن:
                <span className="font-semibold text-blue-600 mx-1">
                  "{filter}"
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-red-500 hover:text-red-700 transition-colors duration-200 apply-fonts-normal text-xs underline"
            >
              إلغاء البحث
            </button>
          </div>
        )}
      </form>

      {/* Search Suggestions (Optional - can be implemented later) */}
      {searchData && searchData.length > 0 && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-3 text-sm text-gray-500 apply-fonts-normal border-b">
            اقتراحات البحث:
          </div>
          <div className="p-2 space-y-1">
            {/* Example suggestions - replace with actual data */}
            <button
              type="button"
              className="w-full text-right px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 apply-fonts-normal text-sm"
              onClick={() => setSearchData("أحمد")}
            >
              أحمد محمد
            </button>
            <button
              type="button"
              className="w-full text-right px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 apply-fonts-normal text-sm"
              onClick={() => setSearchData("فاطمة")}
            >
              فاطمة علي
            </button>
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {/* <button
          type="button"
          onClick={() => setSearchData("")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 apply-fonts-normal ${
            !filter
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          جميع الطلاب
        </button>

        <button
          type="button"
          onClick={() => setSearchData("نشط")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 apply-fonts-normal ${
            filter === "نشط"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          الطلاب النشطون
        </button>

        <button
          type="button"
          onClick={() => setSearchData("غير نشط")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 apply-fonts-normal ${
            filter === "غير نشط"
              ? "bg-red-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          الطلاب غير النشطين
        </button> */}
      </div>
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;

  const debouncedFunction = ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T & { cancel: () => void };

  debouncedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debouncedFunction;
}

export default SearchUsers;
