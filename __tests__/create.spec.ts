import fs from 'fs-extra'
import { createProject } from '../src/create'
import { traverseDirectory } from '../src/utils/convert'

jest.mock('fs-extra')
jest.mock('../src/utils/convert')

describe('createProject', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should copy files from source directory to destination directory', () => {
    // Arrange
    const fromDir = '/path/to/source'
    const toDir = '/path/to/destination'
    const projectName = 'myProject'

    // Act
    createProject(fromDir, toDir, projectName)

    // Assert
    expect(fs.copySync).toHaveBeenCalledWith(fromDir, toDir, { overwrite: true })
  })

  it('should call traverseDirectory with the correct arguments', () => {
    // Arrange
    const fromDir = '/path/to/source'
    const toDir = '/path/to/destination'
    const projectName = 'myProject'

    // Act
    createProject(fromDir, toDir, projectName)

    // Assert
    expect(traverseDirectory).toHaveBeenCalledWith(toDir, {
      GITIGNORE: '.gitignore',
      PROJECT_NAME: projectName,
      PROJECT_UPPER_NAME: 'MyProject',
    })
  })
})
