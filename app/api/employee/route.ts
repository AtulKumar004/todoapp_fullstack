import prisma from "@/app/utils/connect"; 
import { PER_PAGE } from "@/app/utils/constants";
import { paginationMeta } from "@/app/utils/helpers";
import { auth } from "@clerk/nextjs";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const employeeSchema = z.object({
    userRole: z.string({
        required_error: "Role is required",
    }).min(2, "Role must be at least 2 characters"),
    
    phoneNumber: z.string({
        required_error: "Phone number is required",
    }).min(10, "Phone number must be at least 10 digits")
        .regex(/^[0-9]+$/, "Phone number must contain only digits"),
    
    password: z.string({
        required_error: "Password is required",
    }).min(8, "Password must be at least 6 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    
    stage: z.string({
        required_error: "Stage is required",
    }).min(1, "Stage cannot be empty"),
});


export async function POST(req: Request) {
    try {


        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 })
        }
        const body = await req.json();
        const result = employeeSchema.safeParse(body);

        if (!result.success) {
            const errorMessages = result.error.errors.map(error => ({
                field: error.path[0],
                message: error.message
            }));
            return NextResponse.json({ 
                error: "Validation failed", 
                details: errorMessages,
                status: 400 
            });
        }
     

        const {    phoneNumber ,  password , stage } = await req.json();
        

        

        const existingEmployee = await prisma.user.findFirst({
            where: { phoneNumber }
        });

        if (existingEmployee) {
            return NextResponse.json({ 
                error: "Employee with this phone number already exists", 
                status: 400 
            });
        }

        const employee = await prisma.user.create({
            data: {
                "userRole" : UserRole.USER,
                phoneNumber,
                password, // Note: Remember to hash password before saving
                stage,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
        return NextResponse.json({
            message: "Employee created successfully",
            data: employee
        });
        // if (title.length < 3) {
        //     return NextResponse.json({ error: "Title must be at least 3 characters long", status: 400 })
        // }



        // const findStage = await prisma.stages.findFirst({
        //     where: {
        //         title: title
        //     }
        // })
        // if (findStage) {
        //     return NextResponse.json({ error: "Stage already exists", status: 400 })
        // }
        // const stage = await prisma.stages.create({
        //     data: {
        //         title,
        //         isActive: true,
        //         createdAt: new Date(),
        //         updatedAt: new Date(),

        //     }
        // })
        // return NextResponse.json(stage);
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
                // isActive: true,

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
