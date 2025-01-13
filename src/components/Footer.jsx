import React from 'react'

const Footer = () => {
    return (


        <footer class="bg-white dark:bg-gray-800 fixed bottom-0 w-full">
            <div class="w-full">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024  All Rights Reserved.
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer
