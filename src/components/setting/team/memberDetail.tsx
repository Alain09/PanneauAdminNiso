// components/team/MemberDetails.tsx
import { TeamMember } from "@/type";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";

interface MemberDetailsProps {
    member: TeamMember;
}

export default function MemberDetails({ member }: MemberDetailsProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2  pb-8 flex justify-center items-center ">
                <div className="h-[150px] w-[150px] bg-gray-100 rounded-full flex items-center justify-center">

                </div>
            </div>
            <div className="space-y-2 border-b border-b-gray-100  pb-4 flex justify-between items-center ">
                <Label htmlFor="view-lastName">Nom :</Label>
                <Input
                    id="view-lastName"
                    value={member.lastName}
                    readOnly
                    className="shadow shadow-gray-50 max-w-[300px] h-[45px]"
                />
            </div>

            <div className="space-y-2 border-b border-b-gray-100  pb-4 flex justify-between items-center">
                <Label htmlFor="view-firstName">Prénom(s)</Label>
                <Input
                    id="view-firstName"
                    value={member.firstName}
                    readOnly
                    className="shadow shadow-gray-50 max-w-[300px] h-[45px]"
                />
            </div>

            <div className="space-y-2 border-b border-b-gray-100  pb-4 flex justify-between items-center">
                <Label htmlFor="view-email">Email :</Label>
                <Input
                    id="view-email"
                    value={member.email}
                    readOnly
                    className="shadow shadow-gray-50 max-w-[300px] h-[45px]"
                />
            </div>

            <div className="space-y-2 border-b border-b-gray-100 pb-4 flex justify-between items-center">
                <Label htmlFor="view-contact">Contact :</Label>
                <Input
                    id="view-contact"
                    value={member.contact || ""}
                    readOnly
                    className="shadow shadow-gray-50 max-w-[300px] h-[45px]"
                />
            </div>

            <div className="space-y-2 border-b border-b-gray-100  pb-4 flex justify-between items-center">
                <Label htmlFor="view-role">Rôle :</Label>
                <Input
                    id="view-role"
                    value={member.role}
                    readOnly
                    className="shadow shadow-gray-50 max-w-[300px] h-[45px]"
                />
            </div>

            <div className="space-y-2 flex justify-between items-center">
                <Label htmlFor="view-position">Position :</Label>
                <Input
                    id="view-position"
                    value={member.position || ""}
                    readOnly
                    className="shadow shadow-gray-50 max-w-[300px] h-[45px]"
                />
            </div>
        </div>
    );
}