import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(res:Request){

    try {
        const {userId} = auth();
        if(!userId){
            return NextResponse.json({error:"Unauthorized",status:401})
        }
        const {title} = await res.json();

        if(!title){
            return NextResponse.json({error:"Missing required fields",status:400})
        }
        if(title.length<3){
            return NextResponse.json({error:"Title must be at least 3 characters long",status:400})
        }


     
        const findStage = await prisma.stages.findFirst({
            where:{
                title:title
            }
        })
        if(findStage){
            return NextResponse.json({error:"Stage already exists",status:400})
        }   
        const stage = await prisma.stages.create({
            data:{
                title,
                isActive :true,
                createdAt:new Date(),
                updatedAt:new Date(),

            }
        })
        return NextResponse.json(stage);
    } catch (error) {
        console.log("ERROR CREATING STAGE: ",error);
        return NextResponse.json({error:"Error creating stage",status:500})
    }

}

export async function GET(req: Request) {
    try {
        const stages = await prisma.stages.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        if (!stages) {
            return NextResponse.json({ error: "No stages found", status: 404 });
        }
        
        return NextResponse.json(stages);
    } catch (error) {
        console.error("ERROR GETTING STAGES: ", error);
        return NextResponse.json({ error: "Error getting stages", status: 500 });
    }
}   
