import prisma from "@/app/utils/connect";
import { PER_PAGE } from "@/app/utils/constants";
import { paginationMeta } from "@/app/utils/helpers";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {


        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 })
        }
        const { title } = await req.json();

        if (!title) {
            return NextResponse.json({ error: "Missing required fields", status: 400 })
        }
        if (title.length < 3) {
            return NextResponse.json({ error: "Title must be at least 3 characters long", status: 400 })
        }



        const findStage = await prisma.stages.findFirst({
            where: {
                title: title
            }
        })
        if (findStage) {
            return NextResponse.json({ error: "Stage already exists", status: 400 })
        }
        const stage = await prisma.stages.create({
            data: {
                title,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),

            }
        })
        return NextResponse.json(stage);
    } catch (error) {
        console.log("ERROR CREATING STAGE: ", error);
        return NextResponse.json({ error: "Error creating stage", status: 500 })
    }
}

export async function GET(req: Request) {
    try {

        const url = new URL(req.url);
        const search = url.searchParams.get('search') || '';
        const page = parseInt(url.searchParams.get('page') || '1');
        const status = url.searchParams.get('status') || '';
        
        const perPage = parseInt(url.searchParams.get('perPage') || PER_PAGE.toString());

        const skip = (page - 1) * perPage;


        const stages = await prisma.stages.findMany({
            skip: skip,
            take: perPage,
            where: {
                title: { contains: search, mode: 'insensitive' },
                isActive: status ? true : false,

            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalCount = await prisma.stages.count({
            where: {

                isActive: true,
            }
        });

        const pagination = paginationMeta(page, totalCount);


        if (!stages) {
            return NextResponse.json({ error: "No stages found", status: 404 });
        }

        const message = totalCount == 0 ? "Record Not found." : "Stages retrieved successfully.";

        let data = {
            stages,
            pagination,
            message
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("ERROR GETTING STAGES: ", error);
        return NextResponse.json({ error: "Error getting stages", status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    const stage = await prisma.stages.delete({
        where: { id }
    });
    return NextResponse.json(stage);
}
export async function PUT(req: Request) {

    try {
        const { id, status } = await req.json();
        const stage = await prisma.stages.update({
            where: { id },
            data: { isActive: status }
        });


        let data = {
            message: "Stage updated successfully",
            stage,
            status: 200
        }
        


        return NextResponse.json(data);

    } catch (error) {
        console.error("ERROR UPDATING STAGE: ", error);
        return NextResponse.json({ error: "Error updating stage", status: 500 });
    }

}       
