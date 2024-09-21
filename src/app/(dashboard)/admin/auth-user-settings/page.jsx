import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import Image from "next/image";

const UserSettingsPage = async () => {
  const session = await auth();
  const { name, email, phone, img } = session.user; // Destructure values from session.user

  // console.log("vicky", session);
  const { imageFile, imageURL,handleUpload, removeImage } = useImageUpload();


  return (
    <div className="relative flex flex-col items-start gap-8">
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            User Profile Settings
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Name Field */}
            <div className="grid gap-3">
              <Label htmlFor="name" className="text-sm">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Field */}
            <div className="grid gap-3">
              <Label htmlFor="phone" className="text-sm">
                Phone
              </Label>
              <Input
                id="phone"
                type="text"
                value={phone}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Image Field */}
            {imageFile && (
            <div className="grid gap-3">
              <Label htmlFor="img" className="text-sm">
                Profile Image URL
              </Label>
              <Image src={imageFile} alt="Uploaded Image" width={150} height={150} />

              <Input
                id="img"
                type="text"
                value={img}
                placeholder="Enter image URL"
              />
              <button onClick={removeImage} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full">
            Remove
          </button>
            </div>
   )}

        
      <ImageUpload onUpload={handleUpload} />
            {/* Submit Button */}
            <div className="col-span-3">
              <Button type="submit">Update Profile</Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default UserSettingsPage;
