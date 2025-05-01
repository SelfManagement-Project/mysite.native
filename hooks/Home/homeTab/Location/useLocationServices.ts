import { useState } from 'react';

export const useLocationServices = () => {
  const [categories, setCategories] = useState({ exercise: true, shopping: false, frequent: false });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [recentLocations, setRecentLocations] = useState([]);
  const [showRoadView, setShowRoadView] = useState(false);

  const handleCategoryChange = (key: keyof typeof categories) => {
    setCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = () => {
    console.log('검색:', searchKeyword);
  };

  const handleCurrentLocation = () => {
    console.log('현재 위치 요청');
  };

  const handleCategoryFilter = () => {
    console.log('카테고리 필터 적용');
  };

  const handleMarkerClick = (marker: any) => {
    setSelectedLocation(marker);
  };

  const toggleRoadView = () => {
    setShowRoadView(prev => !prev);
  };

  const handleNavigation = () => {
    console.log('네비게이션 시작');
  };

  return {
    categories,
    setSearchKeyword,
    searchKeyword,
    handleCategoryChange,
    handleSearch,
    handleCurrentLocation,
    handleCategoryFilter,
    markers,
    selectedLocation,
    handleMarkerClick,
    showRoadView,
    toggleRoadView,
    handleNavigation,
    recentLocations,
  };
};
