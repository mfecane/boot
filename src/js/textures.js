import ragDiffuseTextureSource from 'assets/textures/rag_blinn_Base_color.png'
import ragNormalTextureSource from 'assets/textures/rag_blinn_Normal_OpenGL.png'
import ragRoughnessTextureSource from 'assets/textures/rag_blinn_Roughness.png'
import ragMetalnessTextureSource from 'assets/textures/rag_blinn_Metallic.png'

import rag2DiffuseTextureSource from 'assets/textures/ref_blinn1SG2_Base_color.png'
import rag2NormalTextureSource from 'assets/textures/ref_blinn1SG2_Normal_OpenGL.png'
import rag2RoughnessTextureSource from 'assets/textures/ref_blinn1SG2_Roughness.png'
import rag2MetalnessTextureSource from 'assets/textures/ref_blinn1SG2_Metallic.png'

import toolsDiffuseTextureSource from 'assets/textures/tools_baseColor.png'
import toolsNormalTextureSource from 'assets/textures/tools_normal.png'
import toolsOcclusionRoughnessMetallic from 'assets/textures/tools_occlusionRoughnessMetallic.png'

import crateDiffuseTextureSource from 'assets/textures/crate_Base_color.png'
import crateNormalTextureSource from 'assets/textures/crate_Normal_OpenGL.png'
import crateRoughnessTextureSource from 'assets/textures/crate_Roughness.png'
import crateMetalnessTextureSource from 'assets/textures/crate_Metallic.png'

import chainDiffuseTextureSource from 'assets/textures/chain_Base_color.png'
import chainNormalTextureSource from 'assets/textures/chain_Normal_OpenGL.png'
import chainRoughnessTextureSource from 'assets/textures/chain_Roughness.png'
import chainMetalnessTextureSource from 'assets/textures/chain_Metallic.png'

const textures = [
  {
    objects: ['rag_low'],
    textures: {
      diffuse: ragDiffuseTextureSource,
      normal: ragNormalTextureSource,
      roughness: ragRoughnessTextureSource,
      metalness: ragMetalnessTextureSource,
    },
  },
  {
    objects: ['rag2_low'],
    textures: {
      diffuse: rag2DiffuseTextureSource,
      normal: rag2NormalTextureSource,
      roughness: rag2RoughnessTextureSource,
      metalness: rag2MetalnessTextureSource,
    },
  },
  {
    objects: [
      'klesch_top_low',
      'klesch_bottom_low',
      'hammer_head_low',
      'hammer_handle_low',
      'pin_lowlow',
    ],
    textures: {
      diffuse: toolsDiffuseTextureSource,
      normal: toolsNormalTextureSource,
      roughness: toolsOcclusionRoughnessMetallic,
      metalness: toolsOcclusionRoughnessMetallic,
      ao: toolsOcclusionRoughnessMetallic,
    },
  },
  {
    objects: ['crate'],
    textures: {
      diffuse: crateDiffuseTextureSource,
      normal: crateNormalTextureSource,
      roughness: crateRoughnessTextureSource,
      metalness: crateMetalnessTextureSource,
    },
  },
  {
    objects: ['chain'],
    textures: {
      diffuse: chainDiffuseTextureSource,
      normal: chainNormalTextureSource,
      roughness: chainRoughnessTextureSource,
      metalness: chainMetalnessTextureSource,
    },
  },
]

export default textures
