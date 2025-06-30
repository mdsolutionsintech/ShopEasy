
import { useState } from "react";
import { Star, MapPin, MessageCircle, Heart, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Product {
  id: string;
  name: string;
  price: string;
  minOrder: string;
  image: string;
  supplier: {
    name: string;
    location: string;
    rating: number;
    verified: boolean;
    avatar: string;
  };
  category: string;
  specifications: string[];
}

interface ProductListingsProps {
  searchQuery: string;
  category: string;
}

const ProductListings = ({ searchQuery, category }: ProductListingsProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: "1",
      name: "Professional LED Display Panel",
      price: "$125.00 - $180.00",
      minOrder: "10 pieces",
      image: "/placeholder.svg",
      supplier: {
        name: "Shenzhen Tech Manufacturing Co.",
        location: "Shenzhen, China",
        rating: 4.8,
        verified: true,
        avatar: "/placeholder.svg"
      },
      category: "electronics",
      specifications: ["Full HD Resolution", "IP65 Rated", "3-Year Warranty"]
    },
    {
      id: "2",
      name: "Industrial CNC Machining Center",
      price: "$15,000 - $45,000",
      minOrder: "1 unit",
      image: "/placeholder.svg",
      supplier: {
        name: "Precision Machinery Ltd",
        location: "Guangzhou, China",
        rating: 4.9,
        verified: true,
        avatar: "/placeholder.svg"
      },
      category: "machinery",
      specifications: ["High Precision", "Automatic Tool Change", "CE Certified"]
    },
    {
      id: "3",
      name: "Organic Cotton Fabric Roll",
      price: "$3.50 - $5.20",
      minOrder: "500 meters",
      image: "/placeholder.svg",
      supplier: {
        name: "Green Textiles Group",
        location: "Hangzhou, China",
        rating: 4.7,
        verified: true,
        avatar: "/placeholder.svg"
      },
      category: "textiles",
      specifications: ["GOTS Certified", "Pre-shrunk", "Multiple Colors"]
    },
    {
      id: "4",
      name: "Smart Home Security Camera",
      price: "$28.00 - $45.00",
      minOrder: "50 pieces",
      image: "/placeholder.svg",
      supplier: {
        name: "Innovation Electronics Corp",
        location: "Dongguan, China",
        rating: 4.6,
        verified: false,
        avatar: "/placeholder.svg"
      },
      category: "electronics",
      specifications: ["1080P HD", "Night Vision", "Mobile App Control"]
    },
    {
      id: "5",
      name: "Stainless Steel Kitchen Equipment",
      price: "$250.00 - $380.00",
      minOrder: "20 pieces",
      image: "/placeholder.svg",
      supplier: {
        name: "Professional Kitchen Solutions",
        location: "Foshan, China",
        rating: 4.8,
        verified: true,
        avatar: "/placeholder.svg"
      },
      category: "home & garden",
      specifications: ["Food Grade Steel", "Easy to Clean", "Commercial Grade"]
    },
    {
      id: "6",
      name: "Solar Panel System Kit",
      price: "$180.00 - $320.00",
      minOrder: "10 sets",
      image: "/placeholder.svg",
      supplier: {
        name: "Green Energy Manufacturing",
        location: "Jiangsu, China",
        rating: 4.9,
        verified: true,
        avatar: "/placeholder.svg"
      },
      category: "construction",
      specifications: ["High Efficiency", "25-Year Warranty", "Weather Resistant"]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Products ({filteredProducts.length})
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Sort by:</span>
          <select className="border rounded px-2 py-1">
            <option>Best Match</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Supplier Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(product.id) 
                        ? "fill-red-500 text-red-500" 
                        : "text-gray-400"
                    }`} 
                  />
                </button>
                {product.supplier.verified && (
                  <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
              
              <div className="space-y-2 mb-3">
                <div className="text-lg font-bold text-blue-600">{product.price}</div>
                <div className="text-sm text-gray-600">Min. Order: {product.minOrder}</div>
              </div>

              <div className="space-y-2 mb-3">
                {product.specifications.slice(0, 2).map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                    {spec}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={product.supplier.avatar} />
                  <AvatarFallback>{product.supplier.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {product.supplier.name}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {product.supplier.location}
                  </div>
                </div>
                <div className="flex items-center text-xs">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  {product.supplier.rating}
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex space-x-2">
              <Button variant="outline" className="flex-1" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Package className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProductListings;
