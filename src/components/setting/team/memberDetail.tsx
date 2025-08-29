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
            <div className="space-y-2 pb-6 md:pb-8 flex justify-center items-center">
                <div className="h-24 w-24 md:h-[150px] md:w-[150px] bg-gray-100 rounded-full flex items-center justify-center">
                    {/* Vous pouvez ajouter une image ou des initiales ici */}
                    <span className="text-2xl md:text-4xl font-semibold text-gray-600">
                        {member.firstName?.charAt(0)}{member.lastName?.charAt(0)}
                    </span>
                </div>
            </div>
            
            <div className="space-y-2 border-b border-b-gray-100 pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <Label htmlFor="view-lastName" className="text-sm md:text-base w-full md:w-1/3">Nom :</Label>
                <Input
                    id="view-lastName"
                    value={member.lastName}
                    readOnly
                    className="shadow shadow-gray-50 w-full md:max-w-[300px] h-10 md:h-[45px]"
                />
            </div>

            <div className="space-y-2 border-b border-b-gray-100 pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <Label htmlFor="view-firstName" className="text-sm md:text-base w-full md:w-1/3">Prénom(s) :</Label>
                <Input
                    id="view-firstName"
                    value={member.firstName}
                    readOnly
                    className="shadow shadow-gray-50 w-full md:max-w-[300px] h-10 md:h-[45px]"
                />
            </div>

            <div className="space-y-2 border-b border-b-gray-100 pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <Label htmlFor="view-email" className="text-sm md:text-base w-full md:w-1/3">Email :</Label>
                <Input
                    id="view-email"
                    value={member.email}
                    readOnly
                    className="shadow shadow-gray-50 w-full md:max-w-[300px] h-10 md:h-[45px]"
                />
            </div>

            <div className="space-y-2 border-b border-b-gray-100 pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <Label htmlFor="view-contact" className="text-sm md:text-base w-full md:w-1/3">Contact :</Label>
                <Input
                    id="view-contact"
                    value={member.contact || ""}
                    readOnly
                    className="shadow shadow-gray-50 w-full md:max-w-[300px] h-10 md:h-[45px]"
                />
            </div>

            <div className="space-y-2 border-b border-b-gray-100 pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <Label htmlFor="view-role" className="text-sm md:text-base w-full md:w-1/3">Rôle :</Label>
                <Input
                    id="view-role"
                    value={member.role}
                    readOnly
                    className="shadow shadow-gray-50 w-full md:max-w-[300px] h-10 md:h-[45px]"
                />
            </div>

            <div className="space-y-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <Label htmlFor="view-position" className="text-sm md:text-base w-full md:w-1/3">Position :</Label>
                <Input
                    id="view-position"
                    value={member.position || ""}
                    readOnly
                    className="shadow shadow-gray-50 w-full md:max-w-[300px] h-10 md:h-[45px]"
                />
            </div>
        </div>
    );
}