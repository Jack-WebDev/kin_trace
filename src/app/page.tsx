"use client"

import { LoginForm } from "@/modules/auth";
import { RegisterForm } from "@/modules/auth/registerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/packages/ui";
import Image from "next/image";


const Home = () => {
	return (
		<>
			<div className={`userAuth h-screen flex flex-col items-center justify-center md:justify-around md:flex-row`}>
				<div className="left__column text-center">
					<Image
						src={"/6974855_4380.jpg"}
						alt=""
						width={500}
						height={500}
						className="form_img hidden md:inline-block"
						style={{ width: "100%", height: "auto" }}
					/>
				</div>
				<Image
					src={"/ndt-technologies-web-logo.svg"}
					alt=""
					width={100}
					height={100}
					className="logo"
				/>

				<div>
					<div className="intro grid justify-items-center relative bottom-12">
						<h1 className="text-[2rem] mt-8 text-[#015a4a] font-semibold">
							New Dawn <span className="text-[#dda83a]">360</span>
						</h1>
						<p className="text-[#015a4a] font-medium text-center">
							Your Time, Our Commitment, Streamlined Together.
						</p>
					</div>
					<Tabs defaultValue="login" className="form__container w-[300px] mx-auto md:w-[400px]">
						<TabsList className="tabs__header mb-8">
							<TabsTrigger value="login" className="login_tab">
								Login
							</TabsTrigger>
							<TabsTrigger value="register" className="register_tab">
								Register
							</TabsTrigger>
						</TabsList>

						<TabsContent value="login">
							<LoginForm />
						</TabsContent>
						<TabsContent value="register">
							<RegisterForm />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default Home;