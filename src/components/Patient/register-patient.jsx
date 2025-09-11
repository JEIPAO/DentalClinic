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
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"


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
                 <ScrollArea className="h-150 w-auto pr-4">
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
                  <CardHeader className="mt-4">
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
                            <Label className="w-auto">3. Have you ever had serious illness or surgical operation?</Label>
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
                            <input type="text" placeholder="If yes, when and why?" className="ml-4 w-max border rounded-md px-2 py-1"/>
                          </div>
                       </div>

                      <div className="grid col-span-3 gap-3">
                        <div className="gap-3 flex  items-center">
                          <Label className="w-lg">4. Have you ever been hospitalized?</Label>
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
                    
                      <div className="grid col-span-4 gap-3">
                        <div className="gap-3 flex  items-center">
                          <Label className="w-max">5. Are you taking any prescription/non-presecription medication?</Label>
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
                          <input type="text" placeholder="If yes, please specify?" className="ml-4 w-auto border rounded-md px-2 py-1"/>
                        </div>
                      </div> 

                       <div className="grid col-span-3 gap-3">
                          <div className="gap-3 flex  items-center">
                            <Label className="w-max">6. Do you use tobacco products?</Label>
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
                            <Label className="w-max">7. Do you use alcohol, cocaine or other dangerous drugs?</Label>
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
                      
                        <div className="grid col-span-4 gap-3">
                          <div className="gap-3 flex  items-center">
                            <Label className="w-lg">8. Are you allergic to any of the following?</Label>
                              
                          </div>
                        <div className="gap-3 flex  items-center ml-4">
                            <div className="gap-3 flex  items-center">
                                  <Checkbox/>
                                  <label className="gap-1 w-auto">
                                    Local anesthetic
                                  </label>
                                <Checkbox/>
                                  <label className="flex items-center gap-1">
                                    Sulfa drugs
                                  </label>
                                    <Checkbox/>
                                  <label className="flex items-center gap-1">
                                  Latex
                                  </label>
                                  <Checkbox/>
                                  <label className="flex items-center gap-1">
                                  Penicillin(Antibiotics)
                                  </label>

                                  <Checkbox/>
                                  <label className="flex items-center gap-1">
                                    Aspirin
                                  </label>
                              <input type="text" placeholder="Others, please specify" className="ml-2 w-auto border rounded-md px-2 py-1"/>
                          
                            </div>
                                
                              
                        
                            </div>
                        </div>
                        <div className="grid col-span-3 gap-3">
                          <Label className="w-lg">9. For women only</Label>
                           <div className="gap-items-center ml-4">
                            
                                <div className="flex items-center gap-4">
                                   <label className="gap-1 w-auto">
                                    Are you Pregnant?
                                  </label>
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
                                <div className="flex items-center gap-4">
                                    <label className="gap-1 w-auto">
                                      Are you Nursing?
                                    </label>
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
                                  <div className="flex items-center gap-4">
                                    <label className="gap-1 w-auto">
                                      Are you taking birth control pills?
                                    </label>
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
                            <Label className="w-max">10. Blood Type</Label>
                           
                            <input type="text" className="ml-4 w-auto border rounded-md px-2 py-1"/>
                          </div>
                       </div>

                         <div className="grid col-span-3 gap-3">
                          <Label className="w-lg">9. Do you have or have you had any of the following? Check which apply:</Label>
                          <div className="grid grid-cols-3 gap-4 ml-4">
                            <div className="grid gap-3">
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  High Blood Pressure
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Respiratory Problems
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Low Blood Pressure
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label  className="flex items-center gap-1">
                                  <Checkbox />
                                  Hepatits/Jaundice
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Epilepsy/Convulsion
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Tuberculosis
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  AIDS/ HIV Infection
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Sexually Transmitted Disease
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Stomach Troubles/Ulcers
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Fainting Seizure
                                </label>
                              </div>
                            </div>
                            <div className="grid gap-3">
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Rapid Weight Loss
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Radiation Therapy
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Joint Replacement/Implant
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Heart Surgery
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Heart Attack
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Thyroid Problem
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Heart Disease
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Heart Murmur
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Hepatitis/ Liver Disease
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Rheumatic Fever
                                </label>
                              </div>
                            </div>
                            <div className="grid gap-3">
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Hay Fever/ Allergies
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Swollen Ankles
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Kidney Disease
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label  className="flex items-center gap-1">
                                  <Checkbox />
                                  Diabetes
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Chest Pain
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label  className="flex items-center gap-1">
                                  <Checkbox />
                                  Stroke
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label  className="flex items-center gap-1">
                                  <Checkbox />
                                  Cancer/ Tumors
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Anemia
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Angina
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Asthma
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Emphysema
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Bleeding Problems
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Head Injuries
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Arthritis/ Rheumatisms
                                </label>
                              </div>
                              <div className="gap-3 flex items-center">
                                <label className="flex items-center gap-1">
                                  <Checkbox />
                                  Other
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                 
                  </CardContent>
                    </ScrollArea>
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
