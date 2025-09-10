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

import { DateBirth } from "./datebirth"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


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
        
        <DialogContent className="sm:max-w-[800px] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
        
          <DialogHeader>
            <DialogTitle>Patient Registration</DialogTitle>
           
          </DialogHeader>

            <Tabs defaultValue="information">
              <TabsList>
                <TabsTrigger value="information">Information</TabsTrigger>
                <TabsTrigger value="minors">For Minors</TabsTrigger>
                <TabsTrigger value="medical-history">Medical History</TabsTrigger>
              </TabsList>
              <TabsContent value="information">
                <Card>
                 
                  <CardContent className="grid grid-cols-3 gap-4 text-gray-500">
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
                    <DateBirth />
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
                    <Label htmlFor="contact_no">Contact No.</Label>
                    <Input id="contact_no" name="contact_no" />
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
                    <Label htmlFor="nickname">Nick Name</Label>
                    <Input id="nickname" name="nickname" />
                  </div>
                  
                  

              </CardContent>
                 
                </Card>
              </TabsContent>
              <TabsContent value="minors">
                <Card>
                  <CardContent className="grid gap-6">
                   <div className="grid gap-3">
                      <Label htmlFor="parent-guard">Parent/Guardian's Name</Label>
                      <Input id="minor-parentname" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="minor_occupation">Occupation</Label>
                      <Input id="minor-occupation"/>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="minor-refer">Whom may we thank for reffering you?</Label>
                      <Input id="minor-refer"/>
                    </div>
                     <div className="grid gap-3">
                      <Label htmlFor="minor-consultation">What is the reason for dental consultation?</Label>
                      <Input id="minor-consultation"/>
                    </div>
                  </CardContent>
            
                </Card>
              </TabsContent>
               <TabsContent value="medical-history">
                <Card>
                  <CardContent className="grid  gap-4 text-gray-500 max-h-[400px] overflow-y-auto ">
                    <div className="grid  gap-3">
                      <Label htmlFor="med-dentist">Name of Dentist</Label>
                      <Input id="med-dentist" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="med-office">Office Address</Label>
                      <Input id="med-office"/>
                    </div>
                     <div className="grid grid-cols-2 gap-4 text-gray-500">
                          <div className="grid gap-3">
                              <Label htmlFor="med-question">1. Are you in good health?</Label>
                            <div className="flex gap-4">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="health-yes"
                                  name="good-health"
                                  value="yes"
                                  className="w-4 h-4"
                                />
                                <label htmlFor="health-yes" className="ml-2">Yes</label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="health-no"
                                  name="good-health"
                                  value="no"
                                  className="w-4 h-4"
                                />
                                <label htmlFor="health-no" className="ml-2">No</label>
                              </div>
                            </div>
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="med-question">1. Are you medical treatment now?</Label>
                            <div className="flex gap-4">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="treatment-yes"
                                  name="medical-treatment"
                                  value="yes"
                                  className="w-4 h-4"
                                />
                                <label htmlFor="health-yes" className="ml-2">Yes</label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="treatment-no"
                                  name="medical-treatment"
                                  value="no"
                                  className="w-4 h-4"
                                />
                                <label htmlFor="health-no" className="ml-2">No</label>
                                  <Input id="minor-occupation"/>
                              </div>
                            </div>
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="med-question">3. How your ever had serious illness or surgical operation?</Label>
                              <div className="flex gap-4">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="serious-no"
                                    name="serious"
                                    value="yes"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-yes" className="ml-2">Yes</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="serious-yes"
                                    name="serious"
                                    value="no"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-no" className="ml-2">No</label>
                                  <Input id="minor-occupation"/>
                                </div>
                              </div>
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="med-question">4. Have you ever been hospitalized?</Label>
                              <div className="flex gap-4">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="hospitalized-yes"
                                    name="hospitalized"
                                    value="yes"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-yes" className="ml-2">Yes</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="hospitalized-no"
                                    name="hospitalized"
                                    value="no"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-no" className="ml-2">No</label>
                                  <Input id="hospitalized_field"/>
                                </div>
                              </div>
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="med-question">5. Are you taking any prescription/non-prescription medication?</Label>
                              <div className="flex gap-4">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-yes"
                                    name="good-health"
                                    value="yes"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-yes" className="ml-2">Yes</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-no"
                                    name="good-health"
                                    value="no"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-no" className="ml-2">No</label>
                                  <Input id="minor-occupation"/>
                                </div>
                              </div>
                          </div>
                           <div className="grid gap-3">
                              <Label htmlFor="med-question">6. Do you use tobacco products?</Label>
                              <div className="flex gap-4">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-yes"
                                    name="good-health"
                                    value="yes"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-yes" className="ml-2">Yes</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-no"
                                    name="good-health"
                                    value="no"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-no" className="ml-2">No</label>
                              
                                </div>
                              </div>
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="med-question">7. Do you use alcohol, cocaine or other dangerous drug?</Label>
                              <div className="flex gap-4">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-yes"
                                    name="good-health"
                                    value="yes"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-yes" className="ml-2">Yes</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-no"
                                    name="good-health"
                                    value="no"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-no" className="ml-2">No</label>
                              
                                </div>
                              </div>
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="med-question">8. Are you allergic to any of the following?</Label>
                              <div className="flex gap-4">
                                <div className="flex items-center">
                                  <Input />
                                </div>
                               
                              </div>
                          </div>
                          
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="minor_occupation">9. For women only:</Label>
                       <div className="grid grid-cols-2 gap-3  text-gray-500 m-auto">
                              <Label htmlFor="med-question">Are you Pregnant? </Label>
                              <div className="flex gap-2">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-yes"
                                    name="good-health"
                                    value="yes"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-yes" className="ml-2">Yes</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-no"
                                    name="good-health"
                                    value="no"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-no" className="ml-2">No</label>
                              
                                </div>
                              </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3  text-gray-500 m-auto">
                              <Label htmlFor="med-question">Are you Nursing? </Label>
                              <div className="flex gap-2">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-yes"
                                    name="good-health"
                                    value="yes"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-yes" className="ml-2">Yes</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-no"
                                    name="good-health"
                                    value="no"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-no" className="ml-2">No</label>
                              
                                </div>
                              </div>
                        </div>
                         <div className="grid grid-cols-2 gap-3  text-gray-500 m-auto">
                              <Label htmlFor="med-question">Are you taking birth control pills? </Label>
                              <div className="flex gap-2">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-yes"
                                    name="good-health"
                                    value="yes"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-yes" className="ml-2">Yes</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="health-no"
                                    name="good-health"
                                    value="no"
                                    className="w-4 h-4"
                                  />
                                  <label htmlFor="health-no" className="ml-2">No</label>
                              
                                </div>
                              </div>
                        </div>
                    </div>
                      <div className="grid gap-3">
                        <div className="flex gap-2">
                        <Label htmlFor="minor_occupation">10. Blood Type:</Label>
                        <Input className="sm:max-w-[500px]"/>
                        </div>
                      </div>
                       <div className="grid gap-3">
                     
                        <Label htmlFor="minor_occupation">12. Do you have or have you had any of the following ? Check which apply:</Label>
                            <div className="flex gap-2">
                                <div className="flex items-center">
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="highBP" className="w-4 h-4"/>
                                      <label htmlFor="highBP">High Blood Pressure</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="lowBP" className="w-4 h-4"/>
                                      <label htmlFor="lowBP">Low Blood Pressure</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="epilepsy" className="w-4 h-4"/>
                                      <label htmlFor="epilepsy">Epilepsy/Convulsions</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="aids" className="w-4 h-4"/>
                                      <label htmlFor="aids">AIDS/HIV Infection</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="std" className="w-4 h-4"/>
                                      <label htmlFor="std">Sexually Transmitted Disease</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="stomachTroubles" className="w-4 h-4"/>
                                      <label htmlFor="stomachTroubles">Stomach Troubles/Ulcers</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="faintingSeizure" className="w-4 h-4"/>
                                      <label htmlFor="faintingSeizure">Fainting Seizure</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="rapidWeightLoss" className="w-4 h-4"/>
                                      <label htmlFor="rapidWeightLoss">Rapid Weight Loss</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="radiationTherapy" className="w-4 h-4"/>
                                      <label htmlFor="radiationTherapy">Radiation Therapy</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="jointReplacement" className="w-4 h-4"/>
                                      <label htmlFor="jointReplacement">Joint Replacement/Implant</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="heartSurgery" className="w-4 h-4"/>
                                      <label htmlFor="heartSurgery">Heart Surgery</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="heartAttack" className="w-4 h-4"/>
                                      <label htmlFor="heartAttack">Heart Attack</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="thyroidProblem" className="w-4 h-4"/>
                                      <label htmlFor="thyroidProblem">Thyroid Problem</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="heartDisease" className="w-4 h-4"/>
                                      <label htmlFor="heartDisease">Heart Disease</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="heartMurmur" className="w-4 h-4"/>
                                      <label htmlFor="heartMurmur">Heart Murmur</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="hepatitis" className="w-4 h-4"/>
                                      <label htmlFor="hepatitis">Hepatitis/Liver Disease</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="rheumaticFever" className="w-4 h-4"/>
                                      <label htmlFor="rheumaticFever">Rheumatic Fever</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="hayFever" className="w-4 h-4"/>
                                      <label htmlFor="hayFever">Hay Fever/Allergies</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="respiratoryProblems" className="w-4 h-4"/>
                                      <label htmlFor="respiratoryProblems">Respiratory Problems</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="hepatitisJaundice" className="w-4 h-4"/>
                                      <label htmlFor="hepatitisJaundice">Hepatitis/Jaundice</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="tuberculosis" className="w-4 h-4"/>
                                      <label htmlFor="tuberculosis">Tuberculosis</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="swollenAnkles" className="w-4 h-4"/>
                                      <label htmlFor="swollenAnkles">Swollen Ankles</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="kidneyDisease" className="w-4 h-4"/>
                                      <label htmlFor="kidneyDisease">Kidney Disease</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="diabetes" className="w-4 h-4"/>
                                      <label htmlFor="diabetes">Diabetes</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="chestPain" className="w-4 h-4"/>
                                      <label htmlFor="chestPain">Chest Pain</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="stroke" className="w-4 h-4"/>
                                      <label htmlFor="stroke">Stroke</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="cancer" className="w-4 h-4"/>
                                      <label htmlFor="cancer">Cancer/Tumors</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="anemia" className="w-4 h-4"/>
                                      <label htmlFor="anemia">Anemia</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="angina" className="w-4 h-4"/>
                                      <label htmlFor="angina">Angina</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="asthma" className="w-4 h-4"/>
                                      <label htmlFor="asthma">Asthma</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="emphysema" className="w-4 h-4"/>
                                      <label htmlFor="emphysema">Emphysema</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="bleedingProblems" className="w-4 h-4"/>
                                      <label htmlFor="bleedingProblems">Bleeding Problems</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="headInjuries" className="w-4 h-4"/>
                                      <label htmlFor="headInjuries">Head Injuries</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="arthritis" className="w-4 h-4"/>
                                      <label htmlFor="arthritis">Arthritis/Rheumatisms</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input type="checkbox" id="other" className="w-4 h-4"/>
                                      <label htmlFor="other">Other:</label>
                                      <Input className="w-40" placeholder="Specify other conditions"/>
                                    </div>
                                  
                                </div>
                          </div>

                        </div>
                      </div>
                  </CardContent>
               
                </Card>
              </TabsContent>
            </Tabs>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
