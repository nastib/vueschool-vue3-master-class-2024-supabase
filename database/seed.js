/* eslint-env node  */
import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config()

// Create supabase client for interacting with your database
const supabaseUrl = process.env.VITE_SUPABASE_URL
const serviceKey = process.env.VITE_SUPABASE_SERVICE_KEY

const supabase = createClient(supabaseUrl, serviceKey)

const testingUserEmail = process.env.TESTING_USER_EMAIL

if (!testingUserEmail) {
  console.error('Have you forgot to add TESTING_USER_EMAIL to your .env file?')
  process.exit()
}

function logErrorAndExit(tableName, error) {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`
  )
  process.exit(1)
}

function logStep(stepMessage) {
  console.log(stepMessage)
}

async function seedProjects(numEntries) {
  logStep('Seeding projects...')
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name,
      slug: name.toLocaleLowerCase().replace(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      collaborators: faker.helpers.arrayElements([1, 2, 3])
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects)

  if (error) return logErrorAndExit('Projects', error)
  logStep('Projects seeded successfully.', data)
  return data
}

async function seedTasks(numEntries, projectsIds) {
  logStep('Seeding tasks...')
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectsIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3])
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error) return logErrorAndExit('Tasks', error)

  logStep('Tasks seeded successfully.')

  return data
}

async function seedDatabase(numEntriesPerTable) {
  await seedProjects(numEntriesPerTable)
  const { data: projects } = await supabase.from('projects').select()
  const projectsIds = projects?.map((project) => project.id)
  if (projectsIds) await seedTasks(numEntriesPerTable, projectsIds)
}

const numEntriesPerTable = 10

await seedDatabase(numEntriesPerTable)
