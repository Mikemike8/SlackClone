import {FcGoogle}  from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader,CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "../types";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
    setState: (state:SignInFlow ) => void;
}

export const SignUpCard = ({setState}: SignUpCardProps) => {
  
    const { signIn } = useAuthActions();
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [confirmPassword,setConfirmPassword] =useState("");
    const [error,setError] =useState<string | null>(null);
    const [pending,setPending] =useState(false);
    const [name, setName] = useState("");

const onPasswordSignUp = (e: React.FormEvent <HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setPending(true);
        signIn("password", {name,email,password,flow:"signUp"}) .catch(() => {
            setError("Failed to sign up. Please try again.");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }).finally(() => setPending(false))

    };


  const onProviderSignUp = (value:"github"|"google") => {
         setPending(true);
        signIn(value).finally(() => setPending(false));
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                     Create an Account to Continue
                </CardTitle>
                <CardDescription> 
                Use your email and password to sign in to your account or another service to continue.
            </CardDescription>
            </CardHeader>
             {!!error && <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6 ">
            <TriangleAlert className="size-4" />
             <p>{error}</p></div>}

            
            <CardContent className="space-y-5 px-0 pb-0">
                <form  onSubmit={onPasswordSignUp} className="space-y-2.5" action="">
                     <Input disabled={pending}  
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder=" Full Name"
                    type="text"
                    required/>
                    <Input disabled={pending}  
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                    type="email"
                    required/>
                      <Input disabled={pending}  value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    type="password"
                    required/>
                    <Input disabled={pending}  
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Confirm Password"
                    type="password"
                    required/>
                    <Button type="submit" className="w-full " size="lg" disabled={pending}> 
                        Continue
                    </Button>



                </form>
                <Separator/>
                <div className="flex flex-col gap-y-2.5">

                    <Button variant="outline" className="w-full relative" size="lg" onClick={() => onProviderSignUp("google")} disabled={pending}> 
                        <FcGoogle className="size-5 absolute left-2.5 top-2.5 "/>    
                        Continue with Google
                    </Button>
                    <Button variant="outline" className="w-full relative" size="lg" onClick={() => onProviderSignUp("github")} disabled={pending}> 
                        <FaGithub className="size-5 absolute left-2.5 top-3 "/>
                        Continue with Github
                    </Button>
                    <p className="text-xs text-muted-foreground">Already have an account? <span onClick={() => setState("signIn")} className="text-sky-700 hover:underline cursor-pointer">Sign In</span></p>
                </div>


            </CardContent>
            
            </Card>
    );
};