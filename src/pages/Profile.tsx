import { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SidebarAdapter from "@/components/layout/SidebarAdapter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import  { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { signOut } = useClerk();

  
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  
  // Get user's auth providers (GitHub, Google, etc.)
  const providers = user?.externalAccounts?.map(account => account.provider) || [];
  
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await user.update({
        firstName,
        lastName,
      });
      
      // Then update in our database
      const response = await fetch('/api/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          first_name: firstName,
          last_name: lastName
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile in database');
      }

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully."
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();  
    navigate("/");    
  };
  
  return (
    <>
      <SidebarAdapter >
        <div className="container max-w-4xl py-10">
          <div className="space-y-6 ">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
                <p className="text-muted-foreground">
                Manage your account settings and profile information.
                </p>
              </div>
              <div>
              <Button className="bg-eduwealth-primary hover:bg-eduwealth-primary/90" onClick={handleLogout}>
                Logout
              </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>Update your personal information here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user.fullName || "User"}</h3>
                      <p className="text-sm text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleUpdateProfile} disabled={isLoading}>
                    {isLoading ? "Updating..." : "Save changes"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Manage your connected authentication providers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {providers.length > 0 ? (
                    providers.map((provider) => (
                      <div key={provider} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {provider === "github" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            </svg>
                          )}
                          {provider === "google" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                              <rect width="20" height="16" x="2" y="4" rx="2" />
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                          )}
                          <span className="capitalize">{provider}</span>
                        </div>
                        <span className="text-sm text-green-500">Connected</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No providers connected</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarAdapter>
    </>
  );
};

export default Profile;