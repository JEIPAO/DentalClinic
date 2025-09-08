import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  IconPlus
} from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { DateBirth } from "./datebirth"


export function RegisterPatient() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
              <IconPlus />
              <span className="hidden lg:inline">Register Patient</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px]" onInteractOutside={(e) => e.preventDefault()}>
          <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue="information" className="w-full">
              <TabsList>
                <TabsTrigger value="information">Information</TabsTrigger>
                <TabsTrigger value="minors">For Minors</TabsTrigger>
                <TabsTrigger value="dentalmedical">Dental&Medical History</TabsTrigger>
              </TabsList>
              <TabsContent value="information">
                <Card>
                  <CardContent className="grid grid-cols-3 gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="fname">Firstname</Label>
                      <Input id="fname" name="fname" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="mname">Middle Name</Label>
                      <Input id="mname" name="mname"  />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="lname">Lastname</Label>
                      <Input id="lname" name="lname" />
                    </div>
                    <div className="grid gap-3">
                      <DateBirth labelname="Date of Birth"/>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" name="age" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="sex">Sex</Label>
                      <select
                        name="sex"
                        className="w-full border rounded-md px-2 py-1"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="religion">Religion</Label>
                      <Input id="religion" name="religion" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input id="nationality" name="nationality" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="contact">Contact No.</Label>
                      <Input id="occupation" name="occupation" />
                    </div>
                    <div className="grid col-span-3 gap-3">
                      <Label htmlFor="address">Address</Label>  
                      <Input id="email-address" name="email-address" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input id="occupation" name="occupation" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email-address">Email Address</Label>
                      <Input id="email-address" name="email-address" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="nickname">Nickname</Label>
                      <Input id="nickname" name="nickname" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="minors">
                <Card>
                  <CardContent className="grid grid-cols-3 gap-4">
                    <div className="grid col-span-3 gap-3">
                      <Label htmlFor="fname">Parent/Guardian's name</Label>
                      <Input id="parent-guardian" name="parent-guardian" />
                    </div>
                    <div className="grid col-span-3 gap-3">
                      <Label>Occupation</Label>
                      <Input id="minor-occupation" name="minor-occupation" />
                    </div>
                    <div className="grid col-span-3 gap-3">
                      <Label>Whom may we thank for referring you?</Label>
                      <Input id="minor-referring" name="minor-referring"/>
                    </div>
                    <div className="grid col-span-3 gap-3">
                      <Label>What is the reason for Dental Consultation?</Label>
                      <Input id="minor-consultation" name="minor-consultation"/>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="dentalmedical">
                <Card>
                  <CardHeader>
                    <CardTitle>Dental History</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4">
                    <div className="grid col-span-2 gap-3">
                      <Label htmlFor="previous-dentist">Previous Dentist</Label>
                      <Input id="previous-dentist" name="previous-dentist" />
                    </div>
                    <div className="grid gap-3">
                      <DateBirth labelname="Last Dental Visit"/>
                    </div>
                  </CardContent>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4">
                    <div className="grid col-span-3 gap-3">
                      <Label htmlFor="fname">Name of Dentist</Label>
                      <Input id="med-dentist" name="med-dentist" />
                    </div>
                    <div className="grid col-span-3 gap-3">
                      <Label>Office Address</Label>
                      <Input id="med-office-address" name="med-office-address"/>
                    </div>
                    <div className="grid col-span-3 gap-3">
                      <div className="gap-3 flex items-center">
                        <Label>1. Are you in good health?</Label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="good-health"
                              value="yes"
                              className="accent-blue-600"
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="good-health"
                              value="no"
                              className="accent-blue-600"
                            />
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                     <div className="grid col-span-3 gap-3">
                      <div className="gap-3 flex  items-center">
                        <Label className="w-lg">2. Are you under medical treatment now?</Label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="good-health"
                              value="yes"
                              className="accent-blue-600"
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="good-health"
                              value="no"
                              className="accent-blue-600"
                            />
                            No
                          </label>
                          
                        </div>
                        <input type="text" placeholder="If yes, what is the condition being treated?" className="ml-4 w-full border rounded-md px-2 py-1"/>
                      </div>
                    </div>

                       <div className="grid col-span-3 gap-3">
                      <div className="gap-3 flex  items-center">
                        <Label className="w-lg">3. Have you ever had serious illness or surgical operation?</Label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="good-health"
                              value="yes"
                              className="accent-blue-600"
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="good-health"
                              value="no"
                              className="accent-blue-600"
                            />
                            No
                          </label>
                          
                        </div>
                        <input type="text" placeholder="If yes, when and why?" className="ml-4 w-full border rounded-md px-2 py-1"/>
                      </div>
                    </div>

                   
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
