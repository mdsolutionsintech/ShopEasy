
import { useState } from "react";
import { Search, MessageCircle, Star, MapPin, Building2, Package, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProductListings from "@/components/ProductListings";
import SupplierProfiles from "@/components/SupplierProfiles";
import SearchFilters from "@/components/SearchFilters";
import MessagingPanel from "@/components/MessagingPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMessaging, setShowMessaging] = useState(false);

  const stats = [
    { icon: Building2, label: "Verified Suppliers", value: "50,000+" },
    { icon: Package, label: "Product Listings", value: "2.5M+" },
    { icon: Users, label: "Global Buyers", value: "180K+" },
    { icon: TrendingUp, label: "Successful Deals", value: "1.2M+" },
  ];

  const categories = [
    "Electronics", "Machinery", "Textiles", "Chemicals", "Construction", 
    "Automotive", "Home & Garden", "Sports", "Fashion", "Food & Beverage"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900">EastWest Exchange</span>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === "products" 
                      ? "text-blue-600 border-b-2 border-blue-600" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab("suppliers")}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === "suppliers" 
                      ? "text-blue-600 border-b-2 border-blue-600" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Suppliers
                </button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMessaging(!showMessaging)}
                className="hidden sm:flex"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Messages
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Join as Supplier
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connect Global Buyers with Chinese Manufacturers
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover millions of products from verified suppliers. Source directly from manufacturers 
            and build lasting business relationships across borders.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products, suppliers, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-gray-900 bg-white border-0"
                />
              </div>
              <Button className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white">
                Search
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.slice(0, 6).map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/20 cursor-pointer transition-colors"
                onClick={() => setSelectedCategory(category.toLowerCase())}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <SearchFilters 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === "products" && (
              <ProductListings searchQuery={searchQuery} category={selectedCategory} />
            )}
            {activeTab === "suppliers" && (
              <SupplierProfiles searchQuery={searchQuery} />
            )}
          </div>

          {/* Messaging Panel */}
          {showMessaging && (
            <div className="hidden xl:block w-80 flex-shrink-0">
              <MessagingPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
