import React from 'react'

export const DashPreloader = () => {
    return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12 h-screen">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <section className="flex flex-col items-center">
          <div className="flex max-w-xl flex-col items-center pb-16 pt-8 text-center lg:pb-48 lg:pt-32">
            <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">Please Wait...</p>
            <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">Loading</h1>
          </div>
        </section>
      </div>
    </div>
    );
}