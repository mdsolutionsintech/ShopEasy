
import { Star, MapPin, MessageCircle, Users, Package, Award, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Supplier {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  avatar: string;
  cover: string;
  yearEstablished: number;
  employees: string;
  mainProducts: string[];
  certifications: string[];
  responseRate: number;
  responseTime: string;
  description: string;
}

interface SupplierProfilesProps {
  searchQuery: string;
}

const SupplierProfiles = ({ searchQuery }: SupplierProfilesProps) => {
  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "Shenzhen Tech Manufacturing Co.",
      location: "Shenzhen, Guangdong, China",
      rating: 4.8,
      reviewCount: 1247,
      verified: true,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      yearEstablished: 2008,
      employees: "501-1000",
      mainProducts: ["LED Displays", "Electronic Components", "Smart Devices"],
      certifications: ["ISO 9001", "CE", "FCC", "RoHS"],
      responseRate: 98,
      responseTime: "< 2 hours",
      description: "Leading manufacturer of electronic components and LED display solutions with 15+ years of experience serving global markets."
    },
    {
      id: "2",
      name: "Precision Machinery Ltd",
      location: "Guangzhou, Guangdong, China",
      rating: 4.9,
      reviewCount: 892,
      verified: true,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      yearEstablished: 2005,
      employees: "201-500",
      mainProducts: ["CNC Machines", "Industrial Equipment", "Automation Systems"],
      certifications: ["ISO 9001", "CE", "SGS"],
      responseRate: 95,
      responseTime: "< 3 hours",
      description: "Specialized in precision machinery and industrial automation with advanced manufacturing facilities and R&D capabilities."
    },
    {
      id: "3",
      name: "Green Textiles Group",
      location: "Hangzhou, Zhejiang, China",
      rating: 4.7,
      reviewCount: 2156,
      verified: true,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      yearEstablished: 2012,
      employees: "1001-5000",
      mainProducts: ["Organic Cotton", "Sustainable Fabrics", "Textile Materials"],
      certifications: ["GOTS", "OEKO-TEX", "ISO 14001"],
      responseRate: 92,
      responseTime: "< 4 hours",
      description: "Eco-friendly textile manufacturer committed to sustainable production and organic materials for the global fashion industry."
    },
    {
      id: "4",
      name: "Innovation Electronics Corp",
      location: "Dongguan, Guangdong, China",
      rating: 4.6,
      reviewCount: 756,
      verified: false,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      yearEstablished: 2015,
      employees: "101-200",
      mainProducts: ["Smart Home Devices", "Security Systems", "IoT Products"],
      certifications: ["CE", "FCC"],
      responseRate: 88,
      responseTime: "< 6 hours",
      description: "Innovative electronics company focusing on smart home solutions and IoT devices with competitive pricing and fast delivery."
    },
    {
      id: "5",
      name: "Professional Kitchen Solutions",
      location: "Foshan, Guangdong, China",
      rating: 4.8,
      reviewCount: 634,
      verified: true,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      yearEstablished: 2010,
      employees: "301-500",
      mainProducts: ["Commercial Kitchen Equipment", "Stainless Steel Products", "Food Service Equipment"],
      certifications: ["ISO 9001", "NSF", "CE"],
      responseRate: 94,
      responseTime: "< 3 hours",
      description: "Professional manufacturer of commercial kitchen equipment and stainless steel products for restaurants and food service industry."
    },
    {
      id: "6",
      name: "Green Energy Manufacturing",
      location: "Jiangsu, China",
      rating: 4.9,
      reviewCount: 1892,
      verified: true,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      yearEstablished: 2006,
      employees: "1001-5000",
      mainProducts: ["Solar Panels", "Renewable Energy Systems", "Energy Storage Solutions"],
      certifications: ["ISO 9001", "IEC", "TUV", "UL"],
      responseRate: 97,
      responseTime: "< 2 hours",
      description: "Leading renewable energy manufacturer with cutting-edge solar technology and comprehensive energy solutions for global markets."
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => 
    searchQuery === "" || 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.mainProducts.some(product => 
      product.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Suppliers ({filteredSuppliers.length})
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Sort by:</span>
          <select className="border rounded px-2 py-1">
            <option>Best Match</option>
            <option>Highest Rated</option>
            <option>Most Reviews</option>
            <option>Response Rate</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
                <img 
                  src={supplier.cover} 
                  alt={`${supplier.name} cover`}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <Avatar className="w-12 h-12 border-2 border-white">
                    <AvatarImage src={supplier.avatar} />
                    <AvatarFallback className="bg-white text-blue-600">
                      {supplier.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{supplier.name}</h3>
                    <div className="flex items-center text-blue-100 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {supplier.location}
                    </div>
                  </div>
                </div>
                {supplier.verified && (
                  <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                    <Award className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{supplier.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({supplier.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Response Rate</div>
                  <div className="font-semibold text-green-600">{supplier.responseRate}%</div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {supplier.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-gray-500">Established</div>
                  <div className="font-medium">{supplier.yearEstablished}</div>
                </div>
                <div>
                  <div className="text-gray-500">Employees</div>
                  <div className="font-medium">{supplier.employees}</div>
                </div>
                <div>
                  <div className="text-gray-500">Response Time</div>
                  <div className="font-medium text-green-600">{supplier.responseTime}</div>
                </div>
                <div>
                  <div className="text-gray-500">Products</div>
                  <div className="font-medium">{supplier.mainProducts.length}+ categories</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">Main Products:</div>
                <div className="flex flex-wrap gap-1">
                  {supplier.mainProducts.slice(0, 3).map((product, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                  {supplier.mainProducts.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{supplier.mainProducts.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">Certifications:</div>
                <div className="flex flex-wrap gap-1">
                  {supplier.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t">
                <Button variant="outline" className="flex-1" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Supplier
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default SupplierProfiles;
