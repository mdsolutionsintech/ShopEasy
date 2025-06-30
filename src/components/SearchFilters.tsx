
import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SearchFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const SearchFilters = ({ selectedCategory, onCategoryChange }: SearchFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    location: true,
    supplier: true,
    price: true,
    certifications: false
  });

  const categories = [
    { id: "all", name: "All Categories", count: 2500000 },
    { id: "electronics", name: "Electronics", count: 450000 },
    { id: "machinery", name: "Machinery", count: 320000 },
    { id: "textiles", name: "Textiles", count: 280000 },
    { id: "chemicals", name: "Chemicals", count: 180000 },
    { id: "construction", name: "Construction", count: 150000 },
    { id: "automotive", name: "Automotive", count: 120000 },
    { id: "home & garden", name: "Home & Garden", count: 200000 },
    { id: "sports", name: "Sports", count: 95000 },
    { id: "fashion", name: "Fashion", count: 110000 },
    { id: "food & beverage", name: "Food & Beverage", count: 85000 }
  ];

  const locations = [
    { id: "guangdong", name: "Guangdong", count: 1200000 },
    { id: "zhejiang", name: "Zhejiang", count: 850000 },
    { id: "jiangsu", name: "Jiangsu", count: 720000 },
    { id: "shandong", name: "Shandong", count: 450000 },
    { id: "fujian", name: "Fujian", count: 380000 }
  ];

  const supplierTypes = [
    { id: "manufacturer", name: "Manufacturer", count: 1800000 },
    { id: "trading", name: "Trading Company", count: 650000 },
    { id: "verified", name: "Verified Supplier", count: 280000 },
    { id: "gold", name: "Gold Supplier", count: 150000 }
  ];

  const certifications = [
    { id: "iso9001", name: "ISO 9001", count: 45000 },
    { id: "ce", name: "CE", count: 38000 },
    { id: "fcc", name: "FCC", count: 22000 },
    { id: "rohs", name: "RoHS", count: 18000 },
    { id: "sgs", name: "SGS", count: 15000 }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" size="sm" className="w-full">
            Clear All Filters
          </Button>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('categories')}
        >
          <CardTitle className="flex items-center justify-between text-base">
            Categories
            {expandedSections.categories ? 
              <ChevronUp className="w-4 h-4" /> : 
              <ChevronDown className="w-4 h-4" />
            }
          </CardTitle>
        </CardHeader>
        {expandedSections.categories && (
          <CardContent className="space-y-2">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                  selectedCategory === category.id 
                    ? "bg-blue-50 text-blue-700" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                <span className="text-sm">{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {formatCount(category.count)}
                </Badge>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          <CardTitle className="flex items-center justify-between text-base">
            Price Range (USD)
            {expandedSections.price ? 
              <ChevronUp className="w-4 h-4" /> : 
              <ChevronDown className="w-4 h-4" />
            }
          </CardTitle>
        </CardHeader>
        {expandedSections.price && (
          <CardContent className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000}
              step={100}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Location */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('location')}
        >
          <CardTitle className="flex items-center justify-between text-base">
            Location
            {expandedSections.location ? 
              <ChevronUp className="w-4 h-4" /> : 
              <ChevronDown className="w-4 h-4" />
            }
          </CardTitle>
        </CardHeader>
        {expandedSections.location && (
          <CardContent className="space-y-2">
            {locations.map((location) => (
              <div key={location.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id={location.id} />
                  <label htmlFor={location.id} className="text-sm cursor-pointer">
                    {location.name}
                  </label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {formatCount(location.count)}
                </Badge>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Supplier Type */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('supplier')}
        >
          <CardTitle className="flex items-center justify-between text-base">
            Supplier Type
            {expandedSections.supplier ? 
              <ChevronUp className="w-4 h-4" /> : 
              <ChevronDown className="w-4 h-4" />
            }
          </CardTitle>
        </CardHeader>
        {expandedSections.supplier && (
          <CardContent className="space-y-2">
            {supplierTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id={type.id} />
                  <label htmlFor={type.id} className="text-sm cursor-pointer">
                    {type.name}
                  </label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {formatCount(type.count)}
                </Badge>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('certifications')}
        >
          <CardTitle className="flex items-center justify-between text-base">
            Certifications
            {expandedSections.certifications ? 
              <ChevronUp className="w-4 h-4" /> : 
              <ChevronDown className="w-4 h-4" />
            }
          </CardTitle>
        </CardHeader>
        {expandedSections.certifications && (
          <CardContent className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id={cert.id} />
                  <label htmlFor={cert.id} className="text-sm cursor-pointer">
                    {cert.name}
                  </label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {formatCount(cert.count)}
                </Badge>
              </div>
            ))}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default SearchFilters;
