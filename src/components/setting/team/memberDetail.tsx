// components/team/MemberDetails.tsx
import { TeamMember } from "@/type";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";

interface MemberDetailsProps {
    member: TeamMember;
}

export default function MemberDetails({ member }: MemberDetailsProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2 pb-6 md:pb-8 flex justify-center items-center">
                <div className="h-24 w-24 md:h-[150px] md:w-[150px] rounded-full overflow-hidden relative flex items-center justify-center bg-gray-100">
  {member.image ? (
    <Image
      src={member.image as string}
      alt={member.name}
      fill
      sizes="(max-width: 768px) 96px, 150px"
      className="object-cover"
      priority={false}
    />
  ) : member.name ? (
    <span className="text-2xl md:text-4xl font-semibold text-gray-600">
      {member.name.split(" ")[0]?.charAt(0)}
      {member.name.split(" ")[1]?.charAt(0)}
    </span>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <svg
        className="w-10 h-10 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  )}
</div>

            </div>

            <div className="space-y-2 border-b border-b-gray-100 pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <Label htmlFor="view-nom" className="text-sm md:text-base w-full md:w-1/3">Nom :</Label>
                <Input
                    id="view-name"
                    value={member.name}
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
                <Label htmlFor="view-phone" className="text-sm md:text-base w-full md:w-1/3">phone :</Label>
                <Input
                    id="view-phone"
                    value={member.phone || ""}
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
            <div className="space-y-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <Label htmlFor="view-position" className="text-sm md:text-base w-full md:w-1/3">Provenance :</Label>
                <Input
                    id="view-provence"
                    value={member.provence || ""}
                    readOnly
                    className="shadow shadow-gray-50 w-full md:max-w-[300px] h-10 md:h-[45px]"
                />
            </div>
        </div>
    );
}