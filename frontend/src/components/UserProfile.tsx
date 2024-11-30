import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Search,
  History,
  Settings,
  Bookmark,
  ThumbsUp,
  Timer,
  Clock,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface UserProfileProps {
  isDark?: boolean;
  setIsDark?: (isDark: boolean) => void;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  description: string;
}

const searchData = [
  { date: '2024-03-01', searches: 145, completions: 120, avgTime: 25 },
  { date: '2024-03-02', searches: 165, completions: 140, avgTime: 22 },
  { date: '2024-03-03', searches: 135, completions: 115, avgTime: 28 },
  { date: '2024-03-04', searches: 175, completions: 155, avgTime: 20 },
  { date: '2024-03-05', searches: 155, completions: 135, avgTime: 23 },
  { date: '2024-03-06', searches: 180, completions: 160, avgTime: 21 },
  { date: '2024-03-07', searches: 170, completions: 150, avgTime: 24 },
];

const topSearches = [
  { term: "React Tutorial", count: 245, trend: 12 },
  { term: "JavaScript Basics", count: 198, trend: -5 },
  { term: "CSS Grid Guide", count: 156, trend: 8 },
  { term: "TypeScript Tips", count: 134, trend: 15 },
  { term: "Next.js Setup", count: 112, trend: 3 },
];

const MetricCard = ({ title, value, change, icon: Icon, description }: MetricCardProps) => {
  return (
    <Card className="flex-shrink-0 w-64 h-64">
      <CardHeader className="flex flex-col items-center space-y-2">
        <Icon className="h-6 w-6 text-gray-500" />
        <CardTitle className="text-sm font-medium text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between h-44 text-center">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold mb-4">{value}</div>
          <p className="text-sm text-gray-500 px-4 line-clamp-2">
            {description}
          </p>
        </div>
        <div className={`text-sm flex items-center gap-1 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          {Math.abs(change)}% from last period
        </div>
      </CardContent>
    </Card>
  );
};

const UserProfile = ({ isDark = false, setIsDark = () => {} }: UserProfileProps) => {
  const [contentType, setContentType] = React.useState('all');
  const [duration, setDuration] = React.useState('any');
  const [timeframe, setTimeframe] = React.useState('week');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/api/placeholder/80/80" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-500">john.doe@example.com</p>
        </div>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
              <CardDescription>Your latest video searches and summaries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { query: "Machine Learning basics", time: "2 hours ago", duration: "15 min video" },
                  { query: "React hooks tutorial", time: "Yesterday", duration: "25 min video" },
                  { query: "Python data structures", time: "2 days ago", duration: "45 min video" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <History className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{item.query}</p>
                        <p className="text-sm text-gray-500">{item.time} • {item.duration}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View Summary</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Content</CardTitle>
              <CardDescription>Your bookmarked videos and summaries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Advanced JavaScript Concepts", tags: ["Programming", "Web Dev"] },
                  { title: "Data Science Fundamentals", tags: ["AI/ML", "Statistics"] }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bookmark className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <div className="flex gap-2 mt-1">
                          {item.tags.map((tag, j) => (
                            <Badge key={j} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Search Analytics</h2>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Last 24 Hours</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-4">
                <MetricCard
                  title="Average Search Time"
                  value="28s"
                  change={-12}
                  icon={Clock}
                  description="Average time users spend searching for content"
                />
                <MetricCard
                  title="Total Searches"
                  value="1,234"
                  change={8}
                  icon={Search}
                  description="Total number of searches performed"
                />
                <MetricCard
                  title="Search Success Rate"
                  value="89%"
                  change={5}
                  icon={ChevronRight}
                  description="Percentage of searches that found relevant content"
                />
              </div>
            </ScrollArea>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Search Trends</CardTitle>
                  <CardDescription>Number of searches over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={searchData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="searches" stroke="#2563eb" />
                        <Line type="monotone" dataKey="completions" stroke="#16a34a" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Search Time</CardTitle>
                  <CardDescription>Time spent searching in seconds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={searchData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="avgTime" fill="#2563eb" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Searches</CardTitle>
                <CardDescription>Most popular search terms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500">{index + 1}</span>
                        <span className="font-medium">{search.term}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500">{search.count} searches</span>
                        <span className={`flex items-center gap-1 ${search.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {search.trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                          {Math.abs(search.trend)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Content Preferences</CardTitle>
              <CardDescription>Customize your video recommendations and summaries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Content Type</label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Content</SelectItem>
                    <SelectItem value="tutorials">Tutorials</SelectItem>
                    <SelectItem value="lectures">Academic Lectures</SelectItem>
                    <SelectItem value="documentaries">Documentaries</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Video Duration</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Length</SelectItem>
                    <SelectItem value="short">Short (&lt; 10 mins)</SelectItem>
                    <SelectItem value="medium">Medium (10-30 mins)</SelectItem>
                    <SelectItem value="long">Long (&gt; 30 mins)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Topics of Interest</label>
                <Textarea 
                  placeholder="Enter topics you're interested in (e.g., Machine Learning, Web Development, Data Science)"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Summary Style</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <ThumbsUp className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Concise</p>
                      <p className="text-sm text-gray-500">Key points only</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <Timer className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Detailed</p>
                      <p className="text-sm text-gray-500">In-depth analysis</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Update Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;